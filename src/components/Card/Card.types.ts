export interface CardData {
  id: number;
  title: string;
  image: {
    url: string;
    alt: string;
  };
}

export interface CardProps {
  variant?: "default" | "circle";
  className?: string;
  data: CardData;
}