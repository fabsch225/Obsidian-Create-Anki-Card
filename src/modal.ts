import { App, Modal, Setting, Notice } from "obsidian";
import { getDeckNames, addCard } from "./anki";

export class AnkiCardModal extends Modal {
  private selectedText: string;
  private deck: string = "";
  private title: string = "";

  constructor(app: App, selectedText: string) {
    super(app);
    this.selectedText = selectedText;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    contentEl.createEl("h2", { text: "Create Anki Card" });

    // Title input
    new Setting(contentEl)
      .setName("Front (Title)")
      .addText(text =>
        text.onChange(value => {
          this.title = value;
        })
      );

    // Deck dropdown
    try {
      const decks = await getDeckNames();

      new Setting(contentEl)
        .setName("Deck")
        .addDropdown(drop => {
          decks.forEach(d => drop.addOption(d, d));
          drop.onChange(value => {
            this.deck = value;
          });
          this.deck = decks[0];
          drop.setValue(this.deck);
        });

    } catch (err) {
      new Notice("Could not connect to Anki. Is Anki running?");
      this.close();
      return;
    }

    // Create button
    new Setting(contentEl)
      .addButton(btn =>
        btn
          .setButtonText("Create Card")
          .setCta()
          .onClick(async () => {
            if (!this.title) {
              new Notice("Front cannot be empty.");
              return;
            }

            try {
              await addCard(this.deck, this.title, this.selectedText);
              new Notice("Card created successfully!");
              this.close();
            } catch (err) {
              new Notice("Failed to create card.");
            }
          })
      );
  }

  onClose() {
    this.contentEl.empty();
  }
}
