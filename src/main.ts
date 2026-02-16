import { Plugin, MarkdownView } from "obsidian";
import { AnkiCardModal } from "./modal";

export default class CreateAnkiCardPlugin extends Plugin {

  async onload() {
    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor) => {
        const selection = editor.getSelection();

        if (selection && selection.trim().length > 0) {
          menu.addItem(item => {
            item
              .setTitle("Create Anki Card")
              .setIcon("plus-circle")
              .onClick(() => {
                new AnkiCardModal(this.app, selection).open();
              });
          });
        }
      })
    );
  }

  onunload() {}
}
