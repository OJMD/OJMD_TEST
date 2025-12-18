import { Injectable } from "@angular/core";

/**
 * Einfacher Custom Markdown Parser Service
 * Unterstützt: H1-H4, hr, ol, ul, fett, kursiv, durchgestrichen, Zitate, Checkboxen
 * Besonderheit: Mehrere Leerzeilen in Listen = dynamischer Abstand
 */
@Injectable()
export class MarkdownParserService {
  private lines: string[] = [];
  private currentIndex = 0;

  parse(markdown: string): string {
    this.lines = markdown.split("\n");
    this.currentIndex = 0;
    const html: string[] = [];
    const paragraphLines: string[] = [];

    while (this.currentIndex < this.lines.length) {
      const line = this.lines[this.currentIndex];
      const trimmed = line.trim();

      // Leerzeile - beendet Paragraph und fügt <br> hinzu
      if (trimmed === "") {
        if (paragraphLines.length > 0) {
          html.push(`<p>${this.parseInline(paragraphLines.join(" "))}</p>`);
          paragraphLines.length = 0;
        }
        html.push("<br>");
        this.currentIndex++;
        continue;
      }

      // Horizontale Linie
      if (/^---+$/.test(trimmed)) {
        if (paragraphLines.length > 0) {
          html.push(`<p>${this.parseInline(paragraphLines.join(" "))}</p>`);
          paragraphLines.length = 0;
        }
        html.push("<hr>");
        this.currentIndex++;
        continue;
      }

      // Überschriften (H1-H4)
      const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
      if (headingMatch) {
        if (paragraphLines.length > 0) {
          html.push(`<p>${this.parseInline(paragraphLines.join(" "))}</p>`);
          paragraphLines.length = 0;
        }
        const level = headingMatch[1].length;
        const text = this.parseInline(headingMatch[2]);
        html.push(`<h${level}>${text}</h${level}>`);
        this.currentIndex++;
        continue;
      }

      // Zitat
      if (trimmed.startsWith(">")) {
        if (paragraphLines.length > 0) {
          html.push(`<p>${this.parseInline(paragraphLines.join(" "))}</p>`);
          paragraphLines.length = 0;
        }
        html.push(this.parseBlockquote());
        this.currentIndex++;
        continue;
      }

      // Nummerierte Liste
      if (/^\d+\.\s+/.test(trimmed)) {
        if (paragraphLines.length > 0) {
          html.push(`<p>${this.parseInline(paragraphLines.join(" "))}</p>`);
          paragraphLines.length = 0;
        }
        html.push(this.parseOrderedList());
        this.currentIndex++;
        continue;
      }

      // Unnummerierte Liste
      if (/^[-*]\s+/.test(trimmed)) {
        if (paragraphLines.length > 0) {
          html.push(`<p>${this.parseInline(paragraphLines.join(" "))}</p>`);
          paragraphLines.length = 0;
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
      html.push(`<p>${this.parseInline(paragraphLines.join(" "))}</p>`);
    }

    return html.join("\n");
  }

  private parseOrderedList(): string {
    const items: string[] = [];
    let emptyLineCount = 0;

    while (this.currentIndex < this.lines.length) {
      const line = this.lines[this.currentIndex];

      // Leerzeile innerhalb der Liste
      if (line.trim() === "") {
        emptyLineCount++;
        this.currentIndex++;
        continue;
      }

      // List-Item
      const match = line.trim().match(/^(\d+)\.\s+(.+)$/);
      if (match) {
        let content = match[2]; // Der Text, nicht die Nummer!
        let checkbox = "";

        // Checkbox erkennen: 1. [ ] oder 1. [x]
        const checkboxMatch = content.match(/^\[([x ])\]\s+(.+)$/);
        if (checkboxMatch) {
          const checked = checkboxMatch[1].toLowerCase() === "x";
          checkbox = `<input type="checkbox" ${checked ? "checked" : ""}> `;
          content = checkboxMatch[2];
        }

        content = this.parseInline(content);

        // Spacing-Klasse basierend auf Leerzeilen
        let spacingClass = "";
        if (emptyLineCount >= 4) spacingClass = ' class="spacing-xlarge"';
        else if (emptyLineCount >= 3) spacingClass = ' class="spacing-large"';
        else if (emptyLineCount >= 2) spacingClass = ' class="spacing-medium"';

        items.push(`<li${spacingClass}>${checkbox}${content}</li>`);
        emptyLineCount = 0;
        this.currentIndex++;
        continue;
      }

      // Liste endet
      break;
    }

    // Leerzeilen am Ende der Liste als <br> ausgeben
    let html = `<ol>\n${items.join("\n")}\n</ol>`;
    if (emptyLineCount > 0) {
      html += "\n" + "<br>\n".repeat(emptyLineCount);
    }

    this.currentIndex--; // Einen Schritt zurück
    return html;
  }

  private parseUnorderedList(): string {
    const items: string[] = [];
    let emptyLineCount = 0;

    while (this.currentIndex < this.lines.length) {
      const line = this.lines[this.currentIndex];

      // Leerzeile innerhalb der Liste
      if (line.trim() === "") {
        emptyLineCount++;
        this.currentIndex++;
        continue;
      }

      // List-Item
      const match = line.trim().match(/^[-*]\s+(.+)$/);
      if (match) {
        let content = match[1];
        let checkbox = "";

        // Checkbox erkennen: - [ ] oder - [x]
        const checkboxMatch = content.match(/^\[([x ])\]\s+(.+)$/);
        if (checkboxMatch) {
          const checked = checkboxMatch[1].toLowerCase() === "x";
          checkbox = `<input type="checkbox" ${checked ? "checked" : ""}> `;
          content = checkboxMatch[2];
        }

        content = this.parseInline(content);

        // Spacing-Klasse basierend auf Leerzeilen
        let spacingClass = "";
        if (emptyLineCount >= 4) spacingClass = ' class="spacing-xlarge"';
        else if (emptyLineCount >= 3) spacingClass = ' class="spacing-large"';
        else if (emptyLineCount >= 2) spacingClass = ' class="spacing-medium"';

        items.push(`<li${spacingClass}>${checkbox}${content}</li>`);
        emptyLineCount = 0;
        this.currentIndex++;
        continue;
      }

      // Liste endet
      break;
    }

    // Leerzeilen am Ende der Liste als <br> ausgeben
    let html = `<ul>\n${items.join("\n")}\n</ul>`;
    if (emptyLineCount > 0) {
      html += "\n" + "<br>\n".repeat(emptyLineCount);
    }

    this.currentIndex--; // Einen Schritt zurück
    return html;
  }

  private parseBlockquote(): string {
    const lines: string[] = [];

    while (this.currentIndex < this.lines.length) {
      const line = this.lines[this.currentIndex];

      if (line.trim().startsWith(">")) {
        const content = line.replace(/^>\s*/, "");
        lines.push(this.parseInline(content));
        this.currentIndex++;
      } else if (line.trim() === "") {
        this.currentIndex++;
        continue;
      } else {
        break;
      }
    }

    this.currentIndex--; // Einen Schritt zurück
    return `<blockquote>\n${lines.join("<br>\n")}\n</blockquote>`;
  }

  private parseInline(text: string): string {
    // Fett: **text** oder __text__
    text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/__(.+?)__/g, "<strong>$1</strong>");

    // Kursiv: *text* oder _text_
    text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
    text = text.replace(/_(.+?)_/g, "<em>$1</em>");

    // Durchgestrichen: ~~text~~
    text = text.replace(/~~(.+?)~~/g, "<del>$1</del>");

    return text;
  }
}
