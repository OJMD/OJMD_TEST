import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { MarkdownParserService } from "./markdown-parser.service";

@Component({
  selector: "app-markdown-editor",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./markdown-editor.component.html",
  styleUrl: "./markdown-editor.component.css",
  providers: [MarkdownParserService],
})
export class MarkdownEditorComponent {
  markdownText = signal<string>("");
  previewHtml = signal<SafeHtml>("");
  copyButtonText = signal<string>("📋 HTML kopieren");
  copyButtonColor = signal<string>("");

  constructor(
    private parser: MarkdownParserService,
    private sanitizer: DomSanitizer
  ) {
    // LocalStorage laden
    this.loadFromStorage();
  }

  onMarkdownChange(): void {
    const html = this.parser.parse(this.markdownText());
    this.previewHtml.set(this.sanitizer.bypassSecurityTrustHtml(html));
    this.saveToStorage();
  }

  clearEditor(): void {
    if (confirm("Möchten Sie wirklich den gesamten Text löschen?")) {
      this.markdownText.set("");
      this.onMarkdownChange();
    }
  }

  async copyHtml(): Promise<void> {
    try {
      const htmlString = this.parser.parse(this.markdownText());
      await navigator.clipboard.writeText(htmlString);

      // Visuelles Feedback
      this.copyButtonText.set("✅ Kopiert!");
      this.copyButtonColor.set("rgba(46, 204, 113, 0.3)");

      setTimeout(() => {
        this.copyButtonText.set("📋 HTML kopieren");
        this.copyButtonColor.set("");
      }, 2000);
    } catch (err) {
      console.error("Fehler beim Kopieren:", err);
      alert("Fehler beim Kopieren in die Zwischenablage");
    }
  }

  onTab(event: KeyboardEvent): void {
    if (event.key === "Tab") {
      event.preventDefault();
      const textarea = event.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = this.markdownText();

      this.markdownText.set(
        text.substring(0, start) + "  " + text.substring(end)
      );

      // Cursor-Position nach Tab setzen
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem("markdown-editor-content", this.markdownText());
      localStorage.setItem(
        "markdown-editor-timestamp",
        new Date().toISOString()
      );
    } catch (err) {
      console.warn("LocalStorage nicht verfügbar:", err);
    }
  }

  private loadFromStorage(): void {
    try {
      const saved = localStorage.getItem("markdown-editor-content");
      if (saved) {
        this.markdownText.set(saved);
        this.onMarkdownChange();
      }
    } catch (err) {
      console.warn("LocalStorage nicht verfügbar:", err);
    }
  }
}
