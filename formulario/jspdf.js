async function generarPDF() {
    document.getElementById("btn-pdf").innerHTML = "Descargarndo"

    //----------
    var descarga = document.getElementById("imprimir")
    var doc = new jsPDF('p', 'pt', 'a4')

    await html2canvas(descarga, {
          width: 550 
    } )

    doc.save("Documento.pdf")
    //---------
    document.getElementById("btn-pdf").innerHTML = "haz click para descargar"
}