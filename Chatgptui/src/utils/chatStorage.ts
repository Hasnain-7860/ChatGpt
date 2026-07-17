import type { Message } from "../Pages/Chat";

const STORAGE_KEY = "chat_messages";

export const getMessages = (): Message[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveMessages = (messages: Message[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

export const clearMessages = () => {
  localStorage.removeItem(STORAGE_KEY);
};