import { Plugin, MarkdownView } from "obsidian";
import { AnkiCardModal } from "./modal";

export interface AnkiPluginSettings {
    defaultDeck: string;
    convertMath: boolean;
    preserveCodeBlocks: boolean;
}

export const DEFAULT_SETTINGS: AnkiPluginSettings = {
    defaultDeck: "",
    convertMath: true,
    preserveCodeBlocks: true
};


export default class CreateAnkiCardPlugin extends Plugin {

    getFirstHeadingFromSelection(selection: string): string | null {
        const lines = selection.split("\n");
        console.log(lines)
        for (const line of lines) {
            const trimmed = line.trim();

            // Match ATX-style headings: # Heading, ## Heading, etc.
            const match = trimmed.match(/^#{1,6}\s+(.*)$/);

            if (match) {
                return match[1].trim();
            }
        }

        return null;
    }



    settings: AnkiPluginSettings = {
        defaultDeck: "",
        convertMath: true,
        preserveCodeBlocks: true
    };

    async onload() {
        await this.loadSettings();

        this.app.workspace.onLayoutReady(() => {
            this.registerEvent(
                this.app.workspace.on("editor-menu", (menu, editor) => {
                    const selection = editor.getSelection();

                    if (selection && selection.trim().length > 0) {
                        menu.addItem(item => {
                            item
                                .setTitle("Create Anki Card")
                                .setIcon("plus-circle")
                                .onClick(() => {
                                    new AnkiCardModal(
                                        this.app,
                                        this,
                                        selection
                                    ).open();
                                });
                        });
                    }
                })
            );
        });


    }

    async loadSettings() {
        this.settings = Object.assign(
            {},
            DEFAULT_SETTINGS,
            await this.loadData()
        );
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }


    onunload() { }
}

