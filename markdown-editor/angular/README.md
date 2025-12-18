# Angular Markdown Editor Komponente

Eine vollständige Angular 21+ Standalone Component für einen Markdown-Editor mit Live-Preview.

## 📁 Dateien

- `markdown-editor.component.ts` - Hauptkomponente mit Signals
- `markdown-editor.component.html` - Template
- `markdown-editor.component.css` - Component-Styles
- `markdown-parser.service.ts` - Parser-Service
- `markdown-styles.global.css` - Globale Preview-Styles

## 🚀 Integration

### 1. Dateien kopieren
Kopiere alle Dateien in dein Angular-Projekt (z.B. nach `src/app/components/markdown-editor/`).

### 2. Globale Styles registrieren
In `angular.json` unter `"styles"` hinzufügen:
```json
{
  "styles": [
    "src/styles.css",
    "src/app/components/markdown-editor/markdown-styles.global.css"
  ]
}
```

### 3. Komponente verwenden
```typescript
import { Component } from '@angular/core';
import { MarkdownEditorComponent } from './components/markdown-editor/markdown-editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MarkdownEditorComponent],
  template: '<app-markdown-editor />'
})
export class AppComponent {}
```

## ✨ Features

- ✅ **Standalone Component** (Angular 14+)
- ✅ **Signals** (Angular 16+)
- ✅ **Two-Way Binding** mit `[(ngModel)]`
- ✅ **LocalStorage** Auto-Save
- ✅ **Tab-Support** im Textarea
- ✅ **HTML kopieren** Button
- ✅ **Responsive Design**
- ✅ **Custom Parser** mit:
  - H1-H4 Überschriften
  - Fett, Kursiv, Durchgestrichen
  - Listen (ol, ul) mit Checkboxen
  - Dynamische Abstände zwischen List-Items
  - Zitate
  - Horizontale Linien

## 🎨 Anpassung

### Farben ändern
In `markdown-editor.component.css`:
```css
:host {
  --color-primary: #3498db;
  --color-secondary: #3498db;
  --color-text: #2c3e50;
  /* ... */
}
```

### Toolbar-Gradient ändern
```css
.toolbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 📝 Markdown-Syntax

- `# H1` bis `#### H4`
- `**fett**` oder `__fett__`
- `*kursiv*` oder `_kursiv_`
- `~~durchgestrichen~~`
- `- [ ]` Checkbox offen
- `- [x]` Checkbox checked
- `1. Nummerierte Liste`
- `- Unnummerierte Liste`
- `> Zitat`
- `---` Horizontale Linie

### Dynamische Abstände
- 2 Leerzeilen = mittlerer Abstand
- 3 Leerzeilen = großer Abstand
- 4+ Leerzeilen = extra großer Abstand

## 🔧 Technische Details

- **Angular Version**: 21+ (kompatibel ab v14)
- **TypeScript**: Strict Mode kompatibel
- **Dependencies**: Nur Angular Core + Forms
- **Bundle Size**: ~5KB (Parser + Component)
- **Performance**: Echtzeit-Parsing mit Debouncing über Signals

## 📦 Optional: Als npm-Package

Um die Komponente als wiederverwendbares Package zu veröffentlichen, nutze:
```bash
ng generate library markdown-editor
```

Dann baue die Component dort nach und publiziere über npm.
