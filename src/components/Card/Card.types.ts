export interface CardData {
  id: number;
  title: string;
  subtitle?: string;
  image?: {
    url: string;
    alt: string;
  };
  time?: string;
  deliveryFee?: number
}

export interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  variant?: "default" | "circle";
  className?: string;
  data: CardData;
  children?: React.ReactNode;
}