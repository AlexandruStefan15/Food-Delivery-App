import type { ID } from "./common";

export interface Restaurant {
  id: ID;
  name: string;
  cuisine: string;
  card_image: string;
  cover_image: string;
  delivery_time: string;
  delivery_fee: number;
  rating: number;
  distance: number;
  closing_time: string;
  food_categories_ids: ID[];
}
