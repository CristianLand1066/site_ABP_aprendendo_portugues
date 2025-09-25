import React from "react";
import { pdf, type DocumentProps } from "@react-pdf/renderer";
import { PdfDocument } from "./pdf.templates";
import type { PdfData } from "./pdf.templates";

export async function generatePdf(data: PdfData): Promise<Blob> {
  const element = React.createElement(
    PdfDocument,
    data
  ) as unknown as React.ReactElement<DocumentProps>;
  const instance = pdf(element);
  const blob = await instance.toBlob();
  return blob;
}

export function downloadBlob(fileName: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
