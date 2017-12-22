import { CartItem } from './CartItem';
export interface Cart {
  owner: string;
  items: CartItem[];
}
