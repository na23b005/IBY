// In-memory storage (later replace with DB/vector DB)
export let documents = [];   // extracted text from PDFs
export let chatHistory = []; // full chat conversation

export const resetStore = () => {
  documents = [];
  chatHistory = [];
};
