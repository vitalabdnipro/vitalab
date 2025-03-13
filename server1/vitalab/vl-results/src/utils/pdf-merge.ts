import { PDFDocument } from "pdf-lib";

export const pdfMerge = async (forms) => {
  const pdfs = forms.map((form) => Buffer.from(form.content, "base64"));

  const pdfDocs = await Promise.all(pdfs.map((pdf) => PDFDocument.load(pdf)));

  const mergedPdf = await PDFDocument.create();

  for (const pdfDoc of pdfDocs) {
    const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    pages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }

  const mergedPdfBytes = await mergedPdf.save();
  const mergedPdfBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
  
  console.log(mergedPdfBlob);
  console.log(mergedPdfBlob.size);
  console.log(mergedPdfBlob.type);

  return mergedPdfBlob;
  // const pdfs = forms.map((form) => Buffer.from(form.content, "base64"));

  // const pdfDocs = await Promise.all(pdfs.map((pdf) => PDFDocument.load(pdf)));

  // const mergedPdf = await PDFDocument.create();

  // for (let pdfDoc of pdfDocs) {
  //   const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
  //   pages.forEach((page) => mergedPdf.addPage(page));
  // }

  // // const mergedPdfBase64 = await mergedPdf.saveAsBase64({ dataUri: true });
  // // return mergedPdfBase64;
  // const mergedPdfBlob = await mergedPdf.save();

  // return mergedPdfBlob;
};
