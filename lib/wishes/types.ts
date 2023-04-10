export interface WishResponse {
  id: number;
  wishes: Wish[];
}

export interface Wish {
  prompt: string;
  response: string;
}
