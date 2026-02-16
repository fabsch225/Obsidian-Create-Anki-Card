# Create Anki Card (Obsidian Plugin)

Create Anki cards directly from selected text in Obsidian using AnkiConnect.

## Features

* Right-click selected text
* Choose **“Create Anki Card”**
* Enter front (title)
* Select deck
* Convert Obsidian-Style Math to Anki
* Convert Codeblocks
* Card is created instantly in Anki

Requires:

* Anki (running)
* AnkiConnect installed
* (Optionally) [Gregs Codehilighter](https://ankiweb.net/shared/info/112228974) for Anki

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
4. Enter the front text and Toggle Codeblocks and Mathjax.
5. Choose a deck.
6. Click **Create Card**.

The selected text becomes the **back** of the card. Codeblocks and Mathjax will be converted optionally.

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