pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');
const btnConvert = document.getElementById('btnConvert');
const btnDownloadZip = document.getElementById('btnDownloadZip');
const resultsContainer = document.getElementById('resultsContainer');

let imagesForZip = [];

dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        fileName.innerText = "Файл: " + file.name;
        fileName.style.display = 'block';
        btnConvert.style.display = 'block';
        resultsContainer.innerHTML = '';
        btnDownloadZip.style.display = 'none';
        imagesForZip = [];
    }
});

btnConvert.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) return;

    btnConvert.innerText = "Обработка...";
    btnConvert.disabled = true;
    resultsContainer.innerHTML = '';

    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2.0 });
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport: viewport }).promise;

            const imageData = canvas.toDataURL('image/png');
            imagesForZip.push({ name: `page_${i}.png`, data: imageData.split(',')[1] });
            renderPageResult(i, imageData);
        }

        btnConvert.style.display = 'none';
        if (pdf.numPages > 1) btnDownloadZip.style.display = 'block';

    } catch (error) {
        showNotify("Ошибка: " + error.message, false);
    } finally {
        btnConvert.innerText = "Преобразовать в JPG";
        btnConvert.disabled = false;
    }
});

function renderPageResult(pageNum, dataUrl) {
    const card = document.createElement('div');
    card.className = 'page-card';
    card.innerHTML = `
        <img src="${dataUrl}">
        <div class="page-info">Страница ${pageNum}</div>
        <div class="page-actions">
            <button class="action-small" onclick="downloadImg('${dataUrl}', ${pageNum})">Скачать</button>
            <button class="action-small" onclick="copyImg('${dataUrl}')">Копировать</button>
        </div>
    `;
    resultsContainer.appendChild(card);
}

btnDownloadZip.addEventListener('click', async () => {
    const zip = new JSZip();
    imagesForZip.forEach(img => zip.file(img.name, img.data, { base64: true }));
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = "images.zip";
    link.click();
});

window.downloadImg = (dataUrl, num) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `page_${num}.png`;
    link.click();
};

window.copyImg = async (dataUrl) => {
    if (!window.ClipboardItem) {
        showNotify("Копирование заблокировано (нужен HTTPS или Localhost)", false);
        return;
    }

    try {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
            new ClipboardItem({ [blob.type]: blob })
        ]);
        showNotify("Скопировано!", true);
    } catch (err) {
        showNotify("Ошибка: " + err.message, false);
    }
};

function showNotify(text, success) {
    if (typeof Message === 'function') {
        new Message({ text: text, success: success, time: 2000 });
    } else {
        alert(text);
    }
}