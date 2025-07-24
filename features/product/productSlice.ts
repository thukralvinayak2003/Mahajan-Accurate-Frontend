// features/products/productSlice.ts
import { ProductFormData, ProductState } from "@/types";
import { Product } from "@/zod";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../../utils/api";


const initialState: ProductState = {
  products: [],
  currentProduct: null,
  popularProducts: [],
  lowStockProducts: [],
  searchResults: [],
  loading: false,
  error: null,
  totalCount: 0,
};

// Thunks
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (
    params?: { page?: number; limit?: number; category?: string },
    thunkAPI?: any
  ) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.category) queryParams.append("category", params.category);

    const res = await API.get(`products?${queryParams.toString()}`);
    return res.data.data;
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id: string, thunkAPI) => {
    const res = await API.get(`products/${id}`);
    return res.data.data;
  }
);

export const createProduct = createAsyncThunk(
  "products/",
  async (productData: ProductFormData, thunkAPI) => {
    const res = await API.post("products", productData);
    return res.data.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    { id, productData }: { id: string; productData: FormData },
    thunkAPI
  ) => {
    const res = await API.put(`products/${id}`, productData);
    return res.data.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, thunkAPI) => {
    await API.delete(`products/${id}`);
    return id;
  }
);

export const updateStock = createAsyncThunk(
  "products/updateStock",
  async ({ id, stock }: { id: string; stock: number }, thunkAPI) => {
    const res = await API.patch(`products/${id}/stock`, { stock });
    return res.data.data;
  }
);

export const getLowStockProducts = createAsyncThunk(
  "products/getLowStockProducts",
  async (threshold?: number, thunkAPI?: any) => {
    const queryParams = threshold ? `?threshold=${threshold}` : "";
    const res = await API.get(`products/low-stock${queryParams}`);
    return res.data.data;
  }
);

export const getPopularProducts = createAsyncThunk(
  "products/getPopularProducts",
  async (limit?: number, thunkAPI?: any) => {
    const queryParams = limit ? `?limit=${limit}` : "";
    const res = await API.get(`products/popular${queryParams}`);
    return res.data.data;
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (
    params: {
      query?: string;
      category?: string;
      minPrice?: number;
      maxPrice?: number;
      page?: number;
      limit?: number;
    },
    thunkAPI
  ) => {
    const queryParams = new URLSearchParams();
    if (params.query) queryParams.append("q", params.query);
    if (params.category) queryParams.append("category", params.category);
    if (params.minPrice)
      queryParams.append("minPrice", params.minPrice.toString());
    if (params.maxPrice)
      queryParams.append("maxPrice", params.maxPrice.toString());
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());

    const res = await API.get(`products/search?${queryParams.toString()}`);
    return res.data.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Products
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllProducts.fulfilled,
        (
          state,
          action: PayloadAction<{ products: Product[]; totalCount: number }>
        ) => {
          state.products = action.payload.products;
          state.totalCount = action.payload.totalCount;
          state.loading = false;
        }
      )
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })

      // Get Product By ID
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.currentProduct = action.payload;
          state.loading = false;
        }
      )
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.unshift(action.payload);
          state.loading = false;
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create product";
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.products.findIndex(
            (p) => p.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
          if (state.currentProduct?.id === action.payload.id) {
            state.currentProduct = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.products = state.products.filter(
            (p) => p.id !== action.payload
          );
          if (state.currentProduct?.id === action.payload) {
            state.currentProduct = null;
          }
          state.loading = false;
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete product";
      })

      // Update Stock
      .addCase(updateStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateStock.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.products.findIndex(
            (p) => p.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
          if (state.currentProduct?.id === action.payload.id) {
            state.currentProduct = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updateStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update stock";
      })

      // Get Low Stock Products
      .addCase(getLowStockProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getLowStockProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.lowStockProducts = action.payload;
          state.loading = false;
        }
      )
      .addCase(getLowStockProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch low stock products";
      })

      // Get Popular Products
      .addCase(getPopularProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPopularProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.popularProducts = action.payload;
          state.loading = false;
        }
      )
      .addCase(getPopularProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch popular products";
      })

      // Search Products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.searchResults = action.payload;
          state.loading = false;
        }
      )
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search products";
      });
  },
});

export const { clearCurrentProduct, clearSearchResults, clearError } =
  productSlice.actions;
export default productSlice.reducer;
