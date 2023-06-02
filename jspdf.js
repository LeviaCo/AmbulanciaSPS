const html2pdf = require('html2pdf.js');
const html2canvas = require('html2canvas');
const jsPDF = require('jspdf');

const doc = require('pdfkit');

document.addEventListener("DOMContentLoaded", () => {
    const $boton = document.querySelector("#btnpdf");
    $boton.addEventListener("click", () => {
        const $ElementoParaConvertir = document.body;
        html2pdf()
            .set({
                margin: 1,
                filename: 'documento.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3,
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a3",
                    orientation: 'portrait'
                }
            })
            .form($ElementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});