import pdfMakePrinter from "pdfmake/src/printer";
import fontDescriptors from "../fonts";

import {
  preparePDFContent,
  prepareStyle,
  prepareInfo,
} from "./preparePDFContent";

export const createPdfBinary = (pdfDoc: any) => {
  return new Promise((resolve, reject) => {
    const printer = new pdfMakePrinter(fontDescriptors);

    const doc = printer.createPdfKitDocument(pdfDoc);

    const chunks: any = [];
    let result;

    doc.on("data", function (chunk: any) {
      chunks.push(chunk);
    });
    doc.on("end", function () {
      result = Buffer.concat(chunks);
      resolve(result);
    });
    doc.on("error", function (error: any) {
      reject(error);
    });
    doc.end();
  });
};

export const printResume = async (resume: any): Promise<any> => {
  const info = prepareInfo(resume);
  const { styles, defaultStyle } = prepareStyle("#0E15E1", "#13D7DE");
  const pdfContent = await preparePDFContent(resume);

  return await createPdfBinary({
    info,
    ...pdfContent,
    styles,
    defaultStyle,
  });
};
