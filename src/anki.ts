const ANKI_CONNECT_URL = "http://127.0.0.1:8765";

async function invoke(action: string, params: any = {}) {
    const response = await fetch(ANKI_CONNECT_URL, {
        method: "POST",
        body: JSON.stringify({
            action,
            version: 6,
            params
        })
    });

    const data = await response.json();

    if (data.error) {
        throw new Error(data.error);
    }

    return data.result;
}

export async function getDeckNames(): Promise<string[]> {
    return invoke("deckNames");
}

export async function addCard(deck: string, front: string, back: string) {
    return invoke("addNote", {
        note: {
            deckName: deck,
            modelName: "Basic",
            fields: {
                Front: front,
                Back: back
            },
            tags: ["obsidian"]
        }
    });
}

export function processContent(
  text: string,
  convertMath: boolean,
  convertCodeBlocks: boolean
): string {
  const codeBlocks: string[] = [];

  text = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, codeContent) => {
    if (convertCodeBlocks) {
      // Convert to HTML <pre><code class="language-...">...</code></pre>
      const escapedCode = codeContent
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      return `<pre style="display:flex; justify-content:center;"><code class="language-${lang}">${escapedCode}</code></pre>`;
    } else {
      codeBlocks.push(_match);
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    }
  });

  if (convertMath) {
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_m, c) => `\\[${c.trim()}\\]`);
    text = text.replace(
      /(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g,
      (_m, c) => `\\(${c.trim()}\\)`
    );
  }

  codeBlocks.forEach((block, i) => {
    text = text.replace(`__CODE_BLOCK_${i}__`, block);
  });

  return text;
}
