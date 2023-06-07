

document.addEventListener("DOMContentLoaded", () => {
    const btnPdf = document.getElementById("btn-pdf");

    btnPdf.addEventListener("click", () => {
        // Obtén el elemento HTML que deseas convertir a PDF
        const elementoParaConvertir = document.body;

        // Crea una instancia de jsPDF
        const doc = new jsPDF();
        console.log("aaaaaa");
        // Convierte el elemento a una imagen mediante html2canvas
        html2canvas(elementoParaConvertir).then(canvas => {
            // Obtiene la imagen en formato base64
            const imagenData = canvas.toDataURL("image/jpeg", 1.0);

            // Agrega la imagen al documento PDF
            doc.addImage(imagenData, "JPEG", 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

            // Guarda el documento PDF
            doc.save("documento.pdf");
        });
    });
});

/*const html2pdf = require('html2pdf');
const html2canvas = require('html2canvas');
const jsPDF = require('jspdf');

const doc = require('pdfkit');

document.getElementById('btnpdf').onclick = function () {
    console.log('holis');
    const $ElementoParaConvertir = document.body;
    console.log('XDDDDDD')
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
                format: "a4",
                orientation: 'portrait'
            }
        })
        .from($ElementoParaConvertir)
        .save()
        .catch(err => console.log(err));
}; */

/*
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('btnpdf').onclick = function () {
        const $ElementoParaConvertir = document.body;
        console.log('XDDDDDD')
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
                    format: "a4",
                    orientation: 'portrait'
                }
            })
            .from($ElementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    }
});

/*
document.addEventListener("DOMContentLoaded", () => {
    const $boton = document.querySelector("#btnpdf");
    $boton.addEventListener("click", () => {
        const $ElementoParaConvertir = document.body;
        html2pdf().set({
            margin: 1,
            filename: 'documento.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, letterRendering: true },
            jsPDF: { unit: "in", format: "a4", orientation: 'portrait' }
        }).from($ElementoParaConvertir).output();
    });
});
*/