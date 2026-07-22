export interface Message {

  _id: string;

  conversation: string;

  role: 'user' | 'assistant';

  content: string;

  createdAt: string;

  updatedAt: string;

}