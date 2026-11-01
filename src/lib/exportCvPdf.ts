import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

export const CV_PAGE_WIDTH_PX = 794;
export const CV_PAGE_HEIGHT_PX = 1123;

function waitForImages(root: HTMLElement, timeoutMs = 8000) {
  const images = Array.from(root.querySelectorAll("img"));
  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
          window.setTimeout(done, timeoutMs);
        })
    )
  );
}

function makePage(name: string, pageIndex: number) {
  const page = document.createElement("div");
  page.setAttribute("data-cv-page", String(pageIndex + 1));
  page.style.cssText = [
    `width:${CV_PAGE_WIDTH_PX}px`,
    `height:${CV_PAGE_HEIGHT_PX}px`,
    "background:#ffffff",
    "box-sizing:border-box",
    pageIndex === 0 ? "padding:40px 52px 36px" : "padding:28px 52px 36px",
    "overflow:hidden",
    "position:relative",
    "color:#111111",
  ].join(";");

  if (pageIndex > 0) {
    const running = document.createElement("div");
    running.setAttribute("data-cv-running", "");
    running.textContent = name;
    running.style.cssText =
      "font-size:11px;color:#666666;border-bottom:1px solid #dddddd;padding-bottom:6px;margin-bottom:14px;font-family:Times,serif;";
    page.appendChild(running);
  }

  const inner = document.createElement("div");
  inner.setAttribute("data-cv-page-inner", "");
  page.appendChild(inner);
  return { page, inner };
}

function overflows(page: HTMLElement) {
  void page.offsetHeight;
  return page.scrollHeight > page.clientHeight + 1;
}

function fitBlockToPage(block: HTMLElement, page: HTMLElement) {
  const images = Array.from(block.querySelectorAll("img"));
  let guard = 0;
  while (overflows(page) && guard < 16 && images.length > 0) {
    const overflow = Math.max(8, page.scrollHeight - page.clientHeight);
    for (const img of images) {
      const current = img.getBoundingClientRect().height || img.offsetHeight;
      const next = Math.max(240, Math.floor(current - overflow - 24));
      img.style.maxHeight = `${next}px`;
      img.style.width = "auto";
      img.style.height = "auto";
      img.style.maxWidth = "100%";
      img.style.objectFit = "contain";
      img.style.display = "block";
      img.style.marginLeft = "auto";
      img.style.marginRight = "auto";
      const stage = img.parentElement;
      if (stage instanceof HTMLElement) {
        stage.style.height = "auto";
        stage.style.maxHeight = "none";
        stage.style.minHeight = "0";
        stage.style.overflow = "hidden";
      }
    }
    guard += 1;
  }
}

function paginateCv(root: HTMLElement, name: string) {
  const blocks = Array.from(
    root.querySelectorAll<HTMLElement>("[data-cv-keep]")
  );
  for (const block of blocks) block.remove();
  root.replaceChildren();

  let pageIndex = 0;
  let current = makePage(name, pageIndex);
  root.appendChild(current.page);

  for (const block of blocks) {
    current.inner.appendChild(block);
    if (overflows(current.page) && current.inner.childElementCount > 1) {
      current.inner.removeChild(block);
      pageIndex += 1;
      current = makePage(name, pageIndex);
      root.appendChild(current.page);
      current.inner.appendChild(block);
    }
    if (overflows(current.page)) {
      fitBlockToPage(block, current.page);
    }
  }
}

function addPageLinks(
  pdf: jsPDF,
  page: HTMLElement,
  pageWidthMm: number,
  pageHeightMm: number
) {
  const pageRect = page.getBoundingClientRect();
  const anchors = page.querySelectorAll<HTMLAnchorElement>("a[href]");
  for (const anchor of anchors) {
    const rect = anchor.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) continue;
    const x = ((rect.left - pageRect.left) / pageRect.width) * pageWidthMm;
    const y = ((rect.top - pageRect.top) / pageRect.height) * pageHeightMm;
    const w = (rect.width / pageRect.width) * pageWidthMm;
    const h = (rect.height / pageRect.height) * pageHeightMm;
    pdf.link(x, y, w, h, { url: anchor.href });
  }
}

const MAX_PDF_BYTES = 1000 * 1000;
const JPEG_QUALITIES = [0.78, 0.7, 0.62, 0.54, 0.46, 0.4, 0.34];
const CANVAS_SCALES = [1, 0.88, 0.76, 0.64];

function scaleCanvas(canvas: HTMLCanvasElement, factor: number) {
  if (factor >= 0.999) return canvas;
  const next = document.createElement("canvas");
  next.width = Math.max(1, Math.round(canvas.width * factor));
  next.height = Math.max(1, Math.round(canvas.height * factor));
  const ctx = next.getContext("2d");
  if (!ctx) return canvas;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, next.width, next.height);
  ctx.drawImage(canvas, 0, 0, next.width, next.height);
  return next;
}

function buildPdf(
  pages: HTMLElement[],
  canvases: HTMLCanvasElement[],
  quality: number
) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < canvases.length; i += 1) {
    const img = canvases[i].toDataURL("image/jpeg", quality);
    if (i > 0) pdf.addPage();
    pdf.addImage(img, "JPEG", 0, 0, pageWidth, pageHeight);
    addPageLinks(pdf, pages[i], pageWidth, pageHeight);
  }

  return pdf;
}

function pdfFits(pdf: jsPDF) {
  return pdf.output("blob").size <= MAX_PDF_BYTES;
}

export async function exportElementToPdf(
  element: HTMLElement,
  filename: string,
  name: string
) {
  await waitForImages(element);
  await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
  paginateCv(element, name);
  await waitForImages(element);

  const pages = Array.from(
    element.querySelectorAll<HTMLElement>("[data-cv-page]")
  );
  if (pages.length === 0) {
    throw new Error("CV pagination produced no pages");
  }

  const captured: HTMLCanvasElement[] = [];
  for (const page of pages) {
    captured.push(
      await html2canvas(page, {
        scale: 1.1,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: CV_PAGE_WIDTH_PX,
        height: CV_PAGE_HEIGHT_PX,
        windowWidth: CV_PAGE_WIDTH_PX,
        windowHeight: CV_PAGE_HEIGHT_PX,
      })
    );
  }

  let chosen: jsPDF | null = null;

  search: for (const canvasScale of CANVAS_SCALES) {
    const canvases = captured.map((canvas) => scaleCanvas(canvas, canvasScale));
    for (const quality of JPEG_QUALITIES) {
      const candidate = buildPdf(pages, canvases, quality);
      if (pdfFits(candidate)) {
        chosen = candidate;
        break search;
      }
    }
  }

  for (let factor = 0.55; !chosen && factor >= 0.38; factor -= 0.07) {
    const canvases = captured.map((canvas) => scaleCanvas(canvas, factor));
    const candidate = buildPdf(pages, canvases, 0.3);
    if (pdfFits(candidate)) chosen = candidate;
  }

  if (!chosen) {
    throw new Error("Portfolio PDF could not be compressed under 1 MB");
  }

  chosen.save(filename);
}
