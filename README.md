# pdf-text2

Refactor of [pdf-text](https://github.com/modesty/pdf2json).


Extracts text from a PDF and returns an array of pages that each contains an array of text lines extracted from that page.

## install

```sh
$ yarn add pdf-text2
```

## use

```js
const PDFText = require('pdf-text2');

var pathToPdf = __dirname + "/info.pdf"

const pdfText = new PDFText(pathToPdf);

const pages = pdfText.parse();

```
