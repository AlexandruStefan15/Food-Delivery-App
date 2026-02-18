import type { ID } from "./common";

export interface Dietary {
  vegan: boolean;
  gluten_free: boolean;
  vegetarian: boolean;
}

export interface Dish {
  id: ID;
  title: string;
  description?: string;
  calories?: number;
  prep_time?: string;
  rating?: number;
  card_image?: string;
  cover_image?: string;
  price: number;
  dietary: Dietary;
  restaurant_id: ID;
  menu_category_id: ID;
}
