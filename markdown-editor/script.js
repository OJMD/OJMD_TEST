// DOM-Elemente
const markdownInput = document.querySelector('.markdown-input');
const markdownPreview = document.querySelector('.markdown-preview');
const btnClear = document.querySelector('.btn-clear');
const btnCopy = document.querySelector('.btn-copy');

// Markdown zu HTML konvertieren und Preview aktualisieren
function updatePreview() {
    const markdownText = markdownInput.value;
    const htmlContent = window.markdownParser.parse(markdownText);
    markdownPreview.innerHTML = htmlContent;
}

// Live-Update beim Tippen
markdownInput.addEventListener('input', updatePreview);

// Löschen-Button
btnClear.addEventListener('click', () => {
    if (confirm('Möchten Sie wirklich den gesamten Text löschen?')) {
        markdownInput.value = '';
        updatePreview();
        markdownInput.focus();
    }
});

// HTML kopieren Button
btnCopy.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(markdownPreview.innerHTML);
        
        // Visuelles Feedback
        const originalText = btnCopy.textContent;
        btnCopy.textContent = '✅ Kopiert!';
        btnCopy.style.backgroundColor = 'rgba(46, 204, 113, 0.3)';
        
        setTimeout(() => {
            btnCopy.textContent = originalText;
            btnCopy.style.backgroundColor = '';
        }, 2000);
    } catch (err) {
        console.error('Fehler beim Kopieren:', err);
        alert('Fehler beim Kopieren in die Zwischenablage');
    }
});

// Tab-Taste im Textarea erlauben (2 Leerzeichen einfügen)
markdownInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        
        const start = markdownInput.selectionStart;
        const end = markdownInput.selectionEnd;
        const value = markdownInput.value;
        
        // 2 Leerzeichen einfügen
        markdownInput.value = value.substring(0, start) + '  ' + value.substring(end);
        
        // Cursor-Position setzen
        markdownInput.selectionStart = markdownInput.selectionEnd = start + 2;
        
        updatePreview();
    }
});

// Initiale Preview rendern
updatePreview();

// LocalStorage: Text speichern und wiederherstellen
const STORAGE_KEY = 'markdown-editor-content';

// Text beim Tippen speichern (mit Verzögerung)
let saveTimeout;
markdownInput.addEventListener('input', () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, markdownInput.value);
    }, 500);
});

// Text beim Laden wiederherstellen (nur wenn Textarea leer ist)
window.addEventListener('DOMContentLoaded', () => {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    // Nur wiederherstellen wenn kein Demo-Content vorhanden ist
    if (savedContent && !markdownInput.value.trim()) {
        markdownInput.value = savedContent;
        updatePreview();
    }
});
