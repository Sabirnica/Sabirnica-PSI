const pdfFiles = [
    'Analiza skripta.pdf',
    'Arhitektura teorijska SKRIPTA.pdf',
    'EES-skripta 2.pdf',
    'Fluidi teorija 2.pdf',
    'Fluidi-kol 1_skraceno.pdf',
    'Mreze 2 (PRMIS)-ispit.pdf',
    'NRS_Ispitna_pitanja_1.pdf',
    'NRS_skipta_manja.pdf',
    'ODP-teorija.pdf',
    'ODP_praktikum.pdf',
    'PJSP skripta -I-.pdf',
    'PJSP skripta -II-.pdf',
    'PP_Teorija.pdf',
    'Primenjeni_algoritmi_skipta.pdf',
    'skripta diskretna-usmeni.pdf',
    'Skripta IUIS 2025.pdf',
    'Skripta za MISS.pdf',
    'skripta-OOT.pdf',
    'skrpita Fluidi kol1.pdf',
    'Sociologija-tehnike-ispit.docx.pdf',
];


const fileList = document.getElementById('fileList');
const searchInput = document.getElementById('searchInput');
const pdfFolder = 'pdfs/';

function displayFiles(files) {
    fileList.innerHTML = '';
    files.forEach(file => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = pdfFolder + file;
        link.textContent = file;
        link.target = '_blank';
        li.appendChild(link);
        fileList.appendChild(li);
    });
}

displayFiles(pdfFiles);

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = pdfFiles.filter(file => file.toLowerCase().includes(searchTerm));
    displayFiles(filtered);
});
