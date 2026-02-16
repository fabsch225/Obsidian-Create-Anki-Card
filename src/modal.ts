import { App, Modal, Setting, Notice } from "obsidian";
import { getDeckNames, addCard, processContent } from "./anki";
import CreateAnkiCardPlugin from "./main";

export class AnkiCardModal extends Modal {
    private deck: string = "";
    private title: string = "";

    constructor(
        app: App,
        private plugin: CreateAnkiCardPlugin,
        private selectedText: string
    ) {
        super(app);
    }


    async onOpen() {
        const { contentEl } = this;
        contentEl.empty();

        contentEl.createEl("h2", { text: "Create Anki Card" });

        const heading = await this.plugin.getFirstHeadingFromSelection(this.selectedText);

        this.title = heading ?? "";

        new Setting(contentEl)
            .setName("Front (Title)")
            .addText(text => {
                text.onChange(value => {
                    this.title = value;
                });
                text.setValue(this.title)
            }
            );

        // Deck dropdown
        try {
            const decks = await getDeckNames();

            new Setting(contentEl)
                .setName("Deck")
                .addDropdown(drop => {
                    decks.forEach(d => drop.addOption(d, d));

                    const defaultDeck =
                        this.plugin.settings.defaultDeck || decks[0];

                    this.deck = defaultDeck;
                    drop.setValue(defaultDeck);

                    drop.onChange(async value => {
                        this.deck = value;
                        this.plugin.settings.defaultDeck = value;
                        await this.plugin.saveSettings();
                    });
                });

            new Setting(contentEl)
                .setName("Convert Math ($ → \\()")
                .addToggle(toggle =>
                    toggle
                        .setValue(this.plugin.settings.convertMath)
                        .onChange(async value => {
                            this.plugin.settings.convertMath = value;
                            await this.plugin.saveSettings();
                        })
                );

            new Setting(contentEl)
                .setName("Preserve Code Blocks")
                .addToggle(toggle =>
                    toggle
                        .setValue(this.plugin.settings.preserveCodeBlocks)
                        .onChange(async value => {
                            this.plugin.settings.preserveCodeBlocks = value;
                            await this.plugin.saveSettings();
                        })
                );


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
                            const processedBack = processContent(
                                this.selectedText,
                                this.plugin.settings.convertMath,
                                this.plugin.settings.preserveCodeBlocks
                            );

                            await addCard(this.deck, this.title, processedBack);

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
