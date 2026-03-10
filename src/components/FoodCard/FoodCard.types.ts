export interface FoodCardData {
  title: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface FoodCardProps {
  variant?: string;
  className?: string;
  data: FoodCardData;
}