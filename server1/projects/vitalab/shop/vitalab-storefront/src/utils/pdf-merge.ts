import { PDFDocument } from "pdf-lib"

export const pdfMerge = async (forms) => {
  // const pdfs = forms.map((form) => Buffer.from(form.content, "base64"));
  const pdfs = forms
    .filter((form) => form.content !== null)
    .map((form) => Buffer.from(form.content, "base64"))

  console.log("f: ", forms)
  console.log("pdfs: ", pdfs)

  const pdfDocs = await Promise.all(pdfs.map((pdf) => PDFDocument.load(pdf)))

  const mergedPdf = await PDFDocument.create()

  for (const pdfDoc of pdfDocs) {
    const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices())
    pages.forEach((page) => {
      mergedPdf.addPage(page)
    })
  }

  const mergedPdfBytes = await mergedPdf.save()
  const mergedPdfBlob = new Blob([mergedPdfBytes], { type: "application/pdf" })

  console.log(mergedPdfBlob)
  console.log(mergedPdfBlob.size)
  console.log(mergedPdfBlob.type)

  return mergedPdfBlob
}
