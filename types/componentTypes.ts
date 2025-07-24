import { Product } from "@/zod";

export interface CardProps {
  title: string;
  description: string;
  image?: string;
  onClick?: () => void;
}

export interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  popularProducts: Product[];
  lowStockProducts: Product[];
  searchResults: Product[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
  size: string;
  updatedAt: string; // Added to track the last update time
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

export interface ProductModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  editingProduct: ProductFormData | null;
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
  selectImage: () => void;
  resetForm: () => void;
  handleSave: () => void;
}
