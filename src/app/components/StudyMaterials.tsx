import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import mammoth from "mammoth";
import {
  Folder,
  FileText,
  FileType,
  Download,
  ChevronRight,
  Search,
  ArrowUp,
  FolderOpen,
  Eye,
  X,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { useInViewOnScrollDown } from "@/app/components/ui/use-in-view-scroll-down";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  apStudyFolders,
  filterStudyFolders,
  findParentFolderId,
  findStudyFolder,
  formatFileSize,
  getBreadcrumb,
  getFolderItemCount,
  getStudyFileUrl,
  type StudyFile,
  type StudyFolder,
} from "@/data/apStudyMaterials";

type ExplorerItem =
  | { kind: "folder"; folder: StudyFolder }
  | { kind: "file"; file: StudyFile; storagePath: string };

type PreviewTarget = {
  file: StudyFile;
  storagePath: string;
  url: string;
};

function FileIcon({ type, size = 20 }: { type: StudyFile["type"]; size?: number }) {
  if (type === "docx") {
    return <FileType size={size} className="text-blue-600 shrink-0" />;
  }
  return <FileText size={size} className="text-red-500 shrink-0" />;
}

function PreviewModal({
  preview,
  locale,
  onClose,
  labels,
}: {
  preview: PreviewTarget;
  locale: "en" | "zh";
  onClose: () => void;
  labels: {
    close: string;
    download: string;
    previewLoading: string;
    previewError: string;
  };
}) {
  const name = locale === "zh" ? preview.file.nameZh : preview.file.nameEn;
  const [docxHtml, setDocxHtml] = useState<string | null>(null);
  const [docxLoading, setDocxLoading] = useState(preview.file.type === "docx");
  const [docxError, setDocxError] = useState(false);

  useEffect(() => {
    if (preview.file.type !== "docx") return;

    let cancelled = false;
    setDocxLoading(true);
    setDocxError(false);
    setDocxHtml(null);

    fetch(preview.url)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.arrayBuffer();
      })
      .then((buffer) => mammoth.convertToHtml({ arrayBuffer: buffer }))
      .then((result) => {
        if (!cancelled) setDocxHtml(result.value);
      })
      .catch(() => {
        if (!cancelled) setDocxError(true);
      })
      .finally(() => {
        if (!cancelled) setDocxLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [preview.url, preview.file.type]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden border border-gray-200"
        initial={{ scale: 0.96, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 12 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2 min-w-0">
            <FileIcon type={preview.file.type} size={18} />
            <span className="font-medium text-gray-900 truncate">{name}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={preview.url}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-white transition-colors"
            >
              <Download size={14} />
              {labels.download}
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label={labels.close}
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-gray-100 relative overflow-hidden">
          {preview.file.type === "pdf" ? (
            <iframe
              src={preview.url}
              title={name}
              className="absolute inset-0 w-full h-full border-0 bg-white"
            />
          ) : docxLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white text-gray-500 gap-2">
              <Loader2 size={20} className="animate-spin" />
              {labels.previewLoading}
            </div>
          ) : docxError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-gray-500 gap-3 px-6 text-center">
              <p>{labels.previewError}</p>
              <a
                href={preview.url}
                download
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Download size={14} />
                {labels.download}
              </a>
            </div>
          ) : (
            <div
              className="absolute inset-0 overflow-auto bg-white p-8 docx-preview"
              dangerouslySetInnerHTML={{ __html: docxHtml ?? "" }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function StudyMaterials() {
  const { t, locale } = useLanguage();
  const { ref, isVisible, transition } = useInViewOnScrollDown({
    margin: "-100px",
  });
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewTarget | null>(null);
  const [navHistory, setNavHistory] = useState<(string | null)[]>([null]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const folderName = (folder: StudyFolder) =>
    locale === "zh" ? folder.nameZh : folder.nameEn;

  const fileName = (file: StudyFile) =>
    locale === "zh" ? file.nameZh : file.nameEn;

  const currentFolder = useMemo(
    () => findStudyFolder(currentFolderId),
    [currentFolderId]
  );

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredRootFolders = useMemo(
    () => filterStudyFolders(apStudyFolders, normalizedQuery, locale),
    [normalizedQuery, locale]
  );

  const breadcrumbTrail = useMemo(() => {
    if (!currentFolderId) return [];
    return getBreadcrumb(currentFolderId, locale);
  }, [currentFolderId, locale]);

  const explorerItems = useMemo((): ExplorerItem[] => {
    if (!currentFolder) {
      return filteredRootFolders.map((folder) => ({
        kind: "folder",
        folder,
      }));
    }
    if (currentFolder.children) {
      const children = normalizedQuery
        ? currentFolder.children.filter(
            (child) => filterStudyFolders([child], normalizedQuery, locale).length > 0
          )
        : currentFolder.children;
      return children.map((folder) => ({ kind: "folder", folder }));
    }
    if (currentFolder.files) {
      const files = normalizedQuery
        ? currentFolder.files.filter(
            (file) =>
              fileName(file).toLowerCase().includes(normalizedQuery) ||
              file.filename.toLowerCase().includes(normalizedQuery)
          )
        : currentFolder.files;
      return files.map((file) => ({
        kind: "file",
        file,
        storagePath: currentFolder.storagePath,
      }));
    }
    return [];
  }, [currentFolder, filteredRootFolders, normalizedQuery, locale]);

  const navigateTo = (folderId: string | null, pushHistory = true) => {
    setCurrentFolderId(folderId);
    setSelectedId(null);
    if (pushHistory) {
      const next = navHistory.slice(0, historyIndex + 1);
      next.push(folderId);
      setNavHistory(next);
      setHistoryIndex(next.length - 1);
    }
  };

  const goBack = () => {
    if (historyIndex <= 0) return;
    const nextIndex = historyIndex - 1;
    setHistoryIndex(nextIndex);
    setCurrentFolderId(navHistory[nextIndex]);
    setSelectedId(null);
  };

  const goForward = () => {
    if (historyIndex >= navHistory.length - 1) return;
    const nextIndex = historyIndex + 1;
    setHistoryIndex(nextIndex);
    setCurrentFolderId(navHistory[nextIndex]);
    setSelectedId(null);
  };

  const goUp = () => {
    if (currentFolderId === null) return;
    const parentId = findParentFolderId(currentFolderId);
    navigateTo(parentId ?? null);
  };

  const openPreview = (file: StudyFile, storagePath: string) => {
    const url = getStudyFileUrl(storagePath, file.filename);
    setPreview({ file, storagePath, url });
  };

  const handleItemOpen = (item: ExplorerItem) => {
    if (item.kind === "folder") {
      navigateTo(item.folder.id);
      return;
    }
    openPreview(item.file, item.storagePath);
  };

  const currentLocationLabel = currentFolder
    ? folderName(currentFolder)
    : t.studyMaterials.apRoot;

  return (
    <section
      id="study-materials"
      className="min-h-[calc(100dvh-4.25rem)] py-32 px-6 bg-white"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8 })}
          className="mb-10"
        >
          <p className="text-sm font-medium text-emerald-700 mb-2">
            {t.studyMaterials.badge}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            {t.studyMaterials.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            {t.studyMaterials.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="rounded-xl border border-gray-200/80 shadow-lg overflow-hidden bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={transition({ duration: 0.8, delay: 0.15 })}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#ececec] border-b border-gray-300/80">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="flex-1 text-center text-sm font-medium text-gray-600 pr-14">
              {t.studyMaterials.windowTitle}
            </span>
          </div>

          <div className="min-h-[520px] flex flex-col bg-white">
            <motion.div
              key={currentFolderId ?? "root"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="flex-1 flex flex-col min-w-0"
            >
              <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-gray-200 bg-[#fafafa]">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={historyIndex <= 0}
                  className="p-1.5 rounded-md text-gray-600 hover:bg-gray-200/70 disabled:opacity-25 transition-colors"
                  title={t.studyMaterials.back}
                >
                  <ChevronLeft size={17} />
                </button>
                <button
                  type="button"
                  onClick={goForward}
                  disabled={historyIndex >= navHistory.length - 1}
                  className="p-1.5 rounded-md text-gray-600 hover:bg-gray-200/70 disabled:opacity-25 transition-colors"
                  title={t.studyMaterials.forward}
                >
                  <ChevronRight size={17} />
                </button>
                <button
                  type="button"
                  onClick={goUp}
                  disabled={currentFolderId === null}
                  className="p-1.5 rounded-md text-gray-600 hover:bg-gray-200/70 disabled:opacity-25 transition-colors"
                  title={t.studyMaterials.up}
                >
                  <ArrowUp size={17} />
                </button>

                <div className="flex-1 flex items-center gap-1.5 mx-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm min-w-0 overflow-x-auto shadow-sm">
                  <FolderOpen size={15} className="text-amber-500 shrink-0" />
                  <button
                    type="button"
                    onClick={() => navigateTo(null)}
                    className={`shrink-0 text-gray-800 ${
                      currentFolderId === null ? "font-medium" : "hover:underline"
                    }`}
                  >
                    {t.studyMaterials.apRoot}
                  </button>
                  {breadcrumbTrail.map((folder) => (
                    <span key={folder.id} className="flex items-center gap-1 shrink-0">
                      <ChevronRight size={12} className="text-gray-400" />
                      <button
                        type="button"
                        onClick={() => navigateTo(folder.id)}
                        className={`text-gray-800 ${
                          folder.id === currentFolderId
                            ? "font-medium"
                            : "hover:underline"
                        }`}
                      >
                        {folderName(folder)}
                      </button>
                    </span>
                  ))}
                </div>

                <div className="relative w-40 shrink-0 hidden sm:block">
                  <Search
                    size={14}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.studyMaterials.searchFiles}
                    className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                </div>
              </div>

              <div className="px-4 py-2 border-b border-gray-100 text-sm text-gray-500">
                <span className="font-medium text-gray-700">{currentLocationLabel}</span>
                <span className="mx-1.5">·</span>
                <span>
                  {explorerItems.length} {t.studyMaterials.items}
                </span>
              </div>

              <div className="flex-1 overflow-auto min-h-[320px]">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 z-10 bg-white border-b border-gray-200 text-left text-[11px] text-gray-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-2.5 font-medium">{t.studyMaterials.name}</th>
                      <th className="px-4 py-2.5 font-medium hidden sm:table-cell">
                        {t.studyMaterials.type}
                      </th>
                      <th className="px-4 py-2.5 font-medium hidden md:table-cell">
                        {t.studyMaterials.size}
                      </th>
                      <th className="px-4 py-2.5 font-medium text-right pr-5">
                        {t.studyMaterials.actions}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {explorerItems.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-20 text-center text-gray-400">
                          {t.studyMaterials.noResults}
                        </td>
                      </tr>
                    ) : (
                      explorerItems.map((item) => {
                        const rowId =
                          item.kind === "folder" ? item.folder.id : item.file.id;
                        const isSelected = selectedId === rowId;
                        const rowClass = `border-b border-gray-100 cursor-pointer select-none transition-colors ${
                          isSelected ? "bg-blue-50/80" : "hover:bg-gray-50/80"
                        }`;

                        if (item.kind === "folder") {
                          return (
                            <tr
                              key={rowId}
                              onClick={() => setSelectedId(rowId)}
                              onDoubleClick={() => handleItemOpen(item)}
                              className={rowClass}
                            >
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3 min-w-0">
                                  <Folder
                                    size={20}
                                    className="text-amber-400 fill-amber-100 shrink-0"
                                  />
                                  <span className="truncate font-medium text-gray-900">
                                    {folderName(item.folder)}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                                {t.studyMaterials.fileFolder}
                              </td>
                              <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                                {getFolderItemCount(item.folder)} {t.studyMaterials.files}
                              </td>
                              <td className="px-4 py-3 text-right pr-4">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleItemOpen(item);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200/80 text-gray-700 border border-gray-200/60 transition-colors"
                                >
                                  <FolderOpen size={13} />
                                  {t.studyMaterials.open}
                                </button>
                              </td>
                            </tr>
                          );
                        }

                        const url = getStudyFileUrl(
                          item.storagePath,
                          item.file.filename
                        );

                        return (
                          <tr
                            key={rowId}
                            onClick={() => setSelectedId(rowId)}
                            onDoubleClick={() => openPreview(item.file, item.storagePath)}
                            className={rowClass}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <FileIcon type={item.file.type} size={20} />
                                <span className="truncate text-gray-900">
                                  {fileName(item.file)}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-gray-500 uppercase hidden sm:table-cell">
                              {item.file.type}
                            </td>
                            <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                              {formatFileSize(item.file.size)}
                            </td>
                            <td className="px-4 py-3 text-right pr-4">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openPreview(item.file, item.storagePath);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200/80 text-gray-700 border border-gray-200/60 transition-colors"
                                >
                                  <Eye size={13} />
                                  {t.studyMaterials.preview}
                                </button>
                                <a
                                  href={url}
                                  download
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 hover:bg-gray-200/80 text-gray-700 border border-gray-200/60 transition-colors"
                                >
                                  <Download size={13} />
                                  {t.studyMaterials.download}
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="px-4 py-2.5 border-t border-gray-200 bg-[#fafafa] text-xs text-gray-400">
                {t.studyMaterials.hint}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {preview && (
          <PreviewModal
            preview={preview}
            locale={locale}
            onClose={() => setPreview(null)}
            labels={{
              close: t.studyMaterials.closePreview,
              download: t.studyMaterials.download,
              previewLoading: t.studyMaterials.previewLoading,
              previewError: t.studyMaterials.previewError,
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
