# Create Anki Card (Obsidian Plugin)

Create Anki cards directly from selected text in Obsidian using AnkiConnect.

## Features

* Right-click selected text
* Choose **“Create Anki Card”**
* Enter front (title)
* Select deck
* Card is created instantly in Anki

Requires:

* Anki (running)
* AnkiConnect installed

---

## Installation (Manual)

1. Clone or download this repository.

2. Run:

   ```bash
   npm install
   npm run build
   ```

3. Copy the plugin folder into:

   ```
   <your-vault>/.obsidian/plugins/create-anki-card
   ```

4. Enable the plugin in **Settings → Community Plugins**.

---

## Usage

1. Select text in a note.
2. Right-click.
3. Click **Create Anki Card**.
4. Enter the front text.
5. Choose a deck.
6. Click **Create Card**.

The selected text becomes the **back** of the card.

---

## Notes

* Anki must be open.
* AnkiConnect must be enabled.
* Uses the **Basic** note type.

---

## Development

Watch mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
```