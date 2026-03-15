export interface CardData {
  id: number;
  image?: {
    url: string;
    alt: string;
  };
  title: string;
  subtitle?: string;
  deliveryTime?: string;
  deliveryFee?: number
}

export interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  variant?: "default" | "circle";
  className?: string;
  data: CardData;
  children?: React.ReactNode;
}