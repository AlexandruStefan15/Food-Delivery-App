export interface FoodCardData {
  id: number;
  title: string;
  image: {
    url: string;
    alt: string;
  };
}

export interface FoodCardProps {
  variant?: "default" | "circle";
  className?: string;
  data: FoodCardData;
}