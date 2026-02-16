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
