/**
 * Einfacher Custom Markdown Parser
 * Unterstützt: H1-H4, hr, ol, ul, fett, kursiv, durchgestrichen, Zitate
 * Besonderheit: Mehrere Leerzeilen in Listen = dynamischer Abstand
 */

class SimpleMarkdownParser {
    constructor() {
        this.lines = [];
        this.currentIndex = 0;
    }

    parse(markdown) {
        this.lines = markdown.split('\n');
        this.currentIndex = 0;
        const html = [];
        let inParagraph = false;
        let paragraphLines = [];

        while (this.currentIndex < this.lines.length) {
            const line = this.lines[this.currentIndex];

            const trimmed = line.trim();
            
            // Leerzeile - beendet Paragraph und fügt <br> hinzu
            if (trimmed === '') {
                if (paragraphLines.length > 0) {
                    html.push(`<p>${this.parseInline(paragraphLines.join(' '))}</p>`);
                    paragraphLines = [];
                    inParagraph = false;
                }
                html.push('<br>');
                this.currentIndex++;
                continue;
            }

            // Horizontale Linie
            if (/^---+$/.test(trimmed)) {
                if (paragraphLines.length > 0) {
                    html.push(`<p>${this.parseInline(paragraphLines.join(' '))}</p>`);
                    paragraphLines = [];
                }
                html.push('<hr>');
                this.currentIndex++;
                continue;
            }

            // Überschriften (H1-H4)
            const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
            if (headingMatch) {
                if (paragraphLines.length > 0) {
                    html.push(`<p>${this.parseInline(paragraphLines.join(' '))}</p>`);
                    paragraphLines = [];
                }
                const level = headingMatch[1].length;
                const text = this.parseInline(headingMatch[2]);
                html.push(`<h${level}>${text}</h${level}>`);
                this.currentIndex++;
                continue;
            }

            // Zitat
            if (trimmed.startsWith('>')) {
                if (paragraphLines.length > 0) {                    
                    html.push(`<p>${this.parseInline(paragraphLines.join(' '))}</p>`);
                    paragraphLines = [];
                }                
                html.push(this.parseBlockquote());
                this.currentIndex++;
                continue;
            }

            // Nummerierte Liste
            if (/^\d+\.\s+/.test(trimmed)) {
                if (paragraphLines.length > 0) {
                    html.push(`<p>${this.parseInline(paragraphLines.join(' '))}</p>`);
                    paragraphLines = [];
                }
                html.push(this.parseOrderedList());
                this.currentIndex++;
                continue;
            }

            // Unnummerierte Liste
            if (/^[-*]\s+/.test(trimmed)) {
                if (paragraphLines.length > 0) {
                    html.push(`<p>${this.parseInline(paragraphLines.join(' '))}</p>`);
                    paragraphLines = [];
                }
                html.push(this.parseUnorderedList());
                this.currentIndex++;
                continue;
            }

            // Normaler Text - sammeln für Paragraph
            paragraphLines.push(trimmed);
            this.currentIndex++;
        }

        // Letzten Paragraph abschließen
        if (paragraphLines.length > 0) {
            html.push(`<p>${this.parseInline(paragraphLines.join(' '))}</p>`);
        }

        return html.join('\n');
    }

    parseLine(line) {
        // Diese Methode wird nicht mehr verwendet, aber behalten für Kompatibilität
        return null;
    }

    parseOrderedList() {
        const items = [];
        let emptyLineCount = 0;
        
        while (this.currentIndex < this.lines.length) {
            const line = this.lines[this.currentIndex];
            
            // Leerzeile innerhalb der Liste
            if (line.trim() === '') {
                emptyLineCount++;
                this.currentIndex++;
                continue;
            }

            // List-Item
            const match = line.trim().match(/^(\d+)\.\s+(.+)$/);
            if (match) {
                let content = match[2];  // Der Text, nicht die Nummer!
                let checkbox = '';
                
                // Checkbox erkennen: - [ ] oder - [x]
                const checkboxMatch = content.match(/^\[([x ])\]\s+(.+)$/);
                if (checkboxMatch) {
                    const checked = checkboxMatch[1].toLowerCase() === 'x';
                    checkbox = `<input type="checkbox" ${checked ? 'checked' : ''} > `;
                    content = checkboxMatch[2];
                }
                
                content = this.parseInline(content);
                
                // Spacing-Klasse basierend auf Leerzeilen
                let spacingClass = '';
                if (emptyLineCount >= 4) spacingClass = ' class="spacing-xlarge"';
                else if (emptyLineCount >= 3) spacingClass = ' class="spacing-large"';
                else if (emptyLineCount >= 2) spacingClass = ' class="spacing-medium"';
                
                items.push(`<li${spacingClass}>${checkbox}${content}</li>`);
                emptyLineCount = 0;
                this.currentIndex++;
                continue;
            }

            // Liste endet - emptyLineCount zurückgeben
            break;
        }

        // Leerzeilen am Ende der Liste als <br> ausgeben
        let html = `<ol>\n${items.join('\n')}\n</ol>`;
        if (emptyLineCount > 0) {
            html += '\n' + '<br>\n'.repeat(emptyLineCount);
        }
        
        this.currentIndex--; // Einen Schritt zurück
        return html;
    }

    parseUnorderedList() {
        const items = [];
        let emptyLineCount = 0;
        
        while (this.currentIndex < this.lines.length) {
            const line = this.lines[this.currentIndex];
            
            // Leerzeile innerhalb der Liste
            if (line.trim() === '') {
                emptyLineCount++;
                this.currentIndex++;
                continue;
            }

            // List-Item
            const match = line.trim().match(/^[-*]\s+(.+)$/);
            if (match) {
                let content = match[1];
                let checkbox = '';
                
                // Checkbox erkennen: - [ ] oder - [x]
                const checkboxMatch = content.match(/^\[([x ])\]\s+(.+)$/);
                if (checkboxMatch) {
                    const checked = checkboxMatch[1].toLowerCase() === 'x';
                    checkbox = `<input type="checkbox" ${checked ? 'checked' : ''}> `;
                    content = checkboxMatch[2];
                }
                
                content = this.parseInline(content);
                
                // Spacing-Klasse basierend auf Leerzeilen
                let spacingClass = '';
                if (emptyLineCount >= 4) spacingClass = ' class="spacing-xlarge"';
                else if (emptyLineCount >= 3) spacingClass = ' class="spacing-large"';
                else if (emptyLineCount >= 2) spacingClass = ' class="spacing-medium"';
                
                items.push(`<li${spacingClass}>${checkbox}${content}</li>`);
                emptyLineCount = 0;
                this.currentIndex++;
                continue;
            }

            // Liste endet - emptyLineCount zurückgeben
            break;
        }

        // Leerzeilen am Ende der Liste als <br> ausgeben
        let html = `<ul>\n${items.join('\n')}\n</ul>`;
        if (emptyLineCount > 0) {
            html += '\n' + '<br>\n'.repeat(emptyLineCount);
        }
        
        this.currentIndex--; // Einen Schritt zurück
        return html;
    }

    parseBlockquote() {
        const lines = [];
        let borderColor = '';
        let firstLine = true;
        
        while (this.currentIndex < this.lines.length) {
            const line = this.lines[this.currentIndex];
            
            if (line.trim().startsWith('>')) {
                let content = line.replace(/^>\s*/, '');
                
                // Erste Zeile: Prüfe auf Farb-Syntax
                if (firstLine) {
                    // Hex-Farbe: >#cc00cc oder >#CC00CC
                    const hexMatch = content.match(/^#([0-9a-fA-F]{6})\s+(.+)$/);
                    if (hexMatch) {
                        borderColor = `#${hexMatch[1]}`;
                        content = hexMatch[2];
                    }
                    
                    // CSS-Variable: >--color-primary oder >--any-var-name
                    const varMatch = content.match(/^(--[\w-]+)\s+(.+)$/);
                    if (varMatch) {
                        borderColor = `var(${varMatch[1]})`;
                        content = varMatch[2];
                    }
                    
                    firstLine = false;
                }
                
                lines.push(this.parseInline(content));
                this.currentIndex++;
            } else if (line.trim() === '') {
                this.currentIndex++;
                continue;
            } else {
                break;
            }
        }

        this.currentIndex--; // Einen Schritt zurück
        
        // Blockquote mit optionaler Farbe
        const style = borderColor ? ` style="border-left-color: ${borderColor};"` : '';
        return `<blockquote${style}>\n${lines.join('<br>\n')}\n</blockquote>`;
    }

    parseInline(text) {
        // Fett: **text** oder __text__
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
        
        // Kursiv: *text* oder _text_
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
        text = text.replace(/_(.+?)_/g, '<em>$1</em>');
        
        // Durchgestrichen: ~~text~~
        text = text.replace(/~~(.+?)~~/g, '<del>$1</del>');
        
        return text;
    }
}

// Globale Instanz erstellen
window.markdownParser = new SimpleMarkdownParser();
