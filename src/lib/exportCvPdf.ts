import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

function waitForImages(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll("img"));
  return Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise<void>((resolve) => {
        const done = () => resolve();
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      });
    })
  );
}

export async function exportElementToPdf(
  element: HTMLElement,
  filename: string
) {
  await waitForImages(element);
  await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));

  const canvas = await html2canvas(element, {
    scale: 1.6,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const pageCanvas = document.createElement("canvas");
  const pageCtx = pageCanvas.getContext("2d");
  if (!pageCtx) {
    throw new Error("Could not create canvas context");
  }

  const sliceHeight = Math.floor((canvas.width * pageHeight) / pageWidth);
  pageCanvas.width = canvas.width;
  let y = 0;
  let first = true;

  while (y < canvas.height) {
    const height = Math.min(sliceHeight, canvas.height - y);
    pageCanvas.height = height;
    pageCtx.fillStyle = "#ffffff";
    pageCtx.fillRect(0, 0, pageCanvas.width, height);
    pageCtx.drawImage(
      canvas,
      0,
      y,
      canvas.width,
      height,
      0,
      0,
      canvas.width,
      height
    );

    const img = pageCanvas.toDataURL("image/jpeg", 0.92);
    const imgHeight = (height * pageWidth) / canvas.width;
    if (!first) pdf.addPage();
    first = false;
    pdf.addImage(img, "JPEG", 0, 0, pageWidth, imgHeight);
    y += sliceHeight;
  }

  pdf.save(filename);
}
