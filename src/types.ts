export interface MessageSource {
  title: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: MessageSource[];
  isCautionary?: boolean;
  isError?: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}
