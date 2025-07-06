export interface CardProps {
  title: string;
  description: string;
  image?: string;
  onClick?: () => void;
}

export interface FormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
  size: string;
}

export interface StockStatus {
  text: string;
  color: string;
}

export interface ImageType {
  uri: string;
  type: string;
  fileName: string;
}