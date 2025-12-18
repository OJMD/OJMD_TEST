# Markdown Syntax Referenz

Diese Datei zeigt alle unterstützten Markdown-Steuerzeichen des Editors.

---

## Überschriften

```
# Überschrift 1 (H1)
## Überschrift 2 (H2)
### Überschrift 3 (H3)
#### Überschrift 4 (H4)
```

---

## Horizontale Linie

```
---
```

Erzeugt eine horizontale Trennlinie.

---

## Text-Formatierung

### Fett (Bold)

```
**Dieser Text ist fett**
__Dieser Text ist auch fett__
```

**Ergebnis:** **Dieser Text ist fett**

### Kursiv (Italic)

```
*Dieser Text ist kursiv*
_Dieser Text ist auch kursiv_
```

**Ergebnis:** *Dieser Text ist kursiv*

### Durchgestrichen (Strikethrough)

```
~~Dieser Text ist durchgestrichen~~
```

**Ergebnis:** ~~Dieser Text ist durchgestrichen~~

### Kombinationen

```
**Fett und _kursiv_** kombiniert
~~**Durchgestrichen und fett**~~
```

---

## Listen

### Nummerierte Listen (Ordered List)

```
1. Erster Punkt
2. Zweiter Punkt
3. Dritter Punkt
```

**Ergebnis:**

1. Erster Punkt
2. Zweiter Punkt
3. Dritter Punkt

### Unnummerierte Listen (Unordered List)

```
- Erster Punkt
- Zweiter Punkt
- Dritter Punkt
```

oder

```
* Erster Punkt
* Zweiter Punkt
* Dritter Punkt
```

**Ergebnis:**

- Erster Punkt
- Zweiter Punkt
- Dritter Punkt

### Dynamische Abstände in Listen

**Spezialfeature:** Mehrere Leerzeilen zwischen List-Items erzeugen größere Abstände!

```
1. Erster Punkt

2. Zweiter Punkt (2 Leerzeilen = mittlerer Abstand)


3. Dritter Punkt (3 Leerzeilen = großer Abstand)



4. Vierter Punkt (4+ Leerzeilen = extra großer Abstand)
```

**Abstand-Stufen:**
- **2 Leerzeilen** = mittlerer Abstand (1.5rem)
- **3 Leerzeilen** = großer Abstand (2.5rem)
- **4+ Leerzeilen** = extra großer Abstand (3.5rem)

---

## Zitate (Blockquotes)

```
> Dies ist ein Zitat.
> Es kann mehrere Zeilen haben.
> Perfekt für wichtige Hinweise!
```

**Ergebnis:**

> Dies ist ein Zitat.
> Es kann mehrere Zeilen haben.
> Perfekt für wichtige Hinweise!

---

## Kombinationen

### Liste mit Formatierungen

```
1. **Wichtiger Punkt** mit zusätzlichem Text
2. *Betonter Punkt* mit ~~Korrektur~~
3. Normaler Punkt
```

### Zitat mit Formatierungen

```
> **Wichtig:** Dies ist ein *hervorgehobenes* Zitat mit ~~Änderung~~.
```

---

## Paragraphen

Einfache Absätze werden durch Leerzeilen getrennt:

```
Dies ist der erste Absatz.

Dies ist der zweite Absatz.
```

---

## Tipps & Tricks

### Mehrere Formatierungen kombinieren

```
**~~*Fett, durchgestrichen UND kursiv*~~**
```

### Listen mit Zitaten

```
1. Punkt eins

2. Punkt zwei
   > Ein Zitat innerhalb einer Liste

3. Punkt drei
```

### Strukturierung langer Texte

```
# Hauptthema

## Unterthema 1

Text zum Unterthema...

### Detail 1.1

- Punkt A
- Punkt B

### Detail 1.2

1. Schritt 1
2. Schritt 2

---

## Unterthema 2

Weiterer Text...
```

---

## Nicht unterstützte Syntax

Folgende Markdown-Features werden **nicht** unterstützt:

- Links: `[Text](url)`
- Bilder: `![Alt](url)`
- Code-Blöcke: ` ```code``` `
- Inline-Code: `` `code` ``
- Tabellen
- Checkboxen
- HTML-Tags

---

## Schnellreferenz

| Syntax | Ergebnis |
|--------|----------|
| `# Text` | H1 Überschrift |
| `## Text` | H2 Überschrift |
| `### Text` | H3 Überschrift |
| `#### Text` | H4 Überschrift |
| `---` | Horizontale Linie |
| `**Text**` | **Fett** |
| `*Text*` | *Kursiv* |
| `~~Text~~` | ~~Durchgestrichen~~ |
| `> Text` | Zitat |
| `1. Text` | Nummerierte Liste |
| `- Text` | Unnummerierte Liste |

---

**Viel Erfolg beim Formatieren!** 🚀
