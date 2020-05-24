import _ from 'lodash';
import Parser from 'pdf3json';

interface PDFTextOptions {
  pdfFilePath: string
}

export default class PDFText {
  options: PDFTextOptions;

  constructor(options: PDFTextOptions) {
    this.options = options;
  }

  async parse(pdfFilePath = this.options.pdfFilePath) {
    return new Promise((resolve, reject) => {
      const parser = new Parser();
      parser.on('pdfParser_dataReady', function(result) {
        const pages = result.data.Pages.map((page, pageIndex) => {
          let text = [];

          const chunks = _(page.Texts)
              .map('R')
              .flatten()
              .map('T')
              .map(decodeURIComponent)
              .value();

          text = text.concat(chunks);

          return { pageIndex, text };
        });

        parser.destroy()

        resolve(pages);
      });

      parser.on('pdfParser_dataError', function(err) {
        parser.destroy()
        reject(err);
      });

      parser.loadPDF(pdfFilePath);
    });
  }
};
