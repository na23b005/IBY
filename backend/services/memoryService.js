import { chatHistory } from "../data/store.js";

export const addMessageToHistory = (role, content) => {
  chatHistory.push({ role, content });
};

export const getChatHistory = () => chatHistory;
