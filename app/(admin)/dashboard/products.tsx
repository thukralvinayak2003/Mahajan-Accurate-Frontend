import { FormData, StockStatus } from "@/types"; // Assuming you have a type for stock status
import { uploadToCloudinary } from "@/utils/cloudnary";
import { Product } from "@/zod";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ListRenderItem,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Dummy data generator matching your Prisma schema
const generateDummyProducts = (): Product[] => [
  {
    id: "cuid_prod_1",
    name: "Alloy Bicycle Pedals",
    description:
      "Durable and lightweight aluminum alloy pedals with anti-slip surface for mountain and road bikes.",
    price: 24.99,
    stock: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1618044733302-e79f35659e5d?w=400",
    size: "Standard",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "cuid_prod_2",
    name: "Derailleur Gear Set",
    description:
      "7-speed rear derailleur gear set compatible with most hybrid and mountain bikes.",
    price: 49.99,
    stock: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1633471224597-6901d156afc0?w=400",
    size: "7-Speed",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
  },
  {
    id: "cuid_prod_3",
    name: "Disc Brake Kit",
    description:
      "High-performance mechanical disc brake kit with rotors and calipers for front and rear wheels.",
    price: 69.99,
    stock: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1623276521445-21aaf235a73b?w=400",
    size: "160mm",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-15",
  },
  {
    id: "cuid_prod_4",
    name: "Carbon Fiber Handlebar",
    description:
      "Lightweight carbon fiber flat handlebar for better control and shock absorption.",
    price: 89.99,
    stock: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1618081589292-cc398a7f77d5?w=400",
    size: "720mm",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-22",
  },
  {
    id: "cuid_prod_5",
    name: "Comfort Saddle Seat",
    description:
      "Ergonomic bicycle saddle with memory foam and dual-spring suspension for long rides.",
    price: 39.99,
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1558981289-2f5a87b4e29d?w=400",
    size: "Universal Fit",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-19",
  },
];

export default function ProductTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    size: "",
  });

  useEffect(() => {
    // Initialize with dummy data
    setProducts(generateDummyProducts());
  }, []);

  const resetForm = (): void => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      imageUrl: "",
      size: "",
    });
    setEditingProduct(null);
  };

  const selectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    let imageUrl: string = "";
    // alert(result.assets?.[0]?.uri || "No image selected");

    try {
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        imageUrl = await uploadToCloudinary({
          uri: asset.uri,
          type: asset.type || "image/jpeg",
          fileName: asset.fileName || "upload.jpg",
        });
      }

      if (imageUrl) {
        alert(imageUrl);
        setFormData({ ...formData, imageUrl });
      } else {
        // Alert.alert("Image Selection Error", "Failed to select image");
        // Alert.alert("Image Selection Error", "Failed to select image");
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Image Selection Error", "Failed to select image");
      return;
    }
  };

  const openCreateModal = (): void => {
    resetForm();
    setModalVisible(true);
  };

  const openEditModal = (product: Product): void => {
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      stock: product.stock.toString(),
      imageUrl: product.imageUrl || "",
      size: product.size || "",
    });
    setEditingProduct(product);
    setModalVisible(true);
  };

  const handleSave = (): void => {
    // Basic validation
    if (!formData.name.trim() || !formData.price.trim()) {
      Alert.alert(
        "Validation Error",
        "Product name and price are required fields"
      );
      return;
    }

    const price = parseFloat(formData.price);
    const stock = parseInt(formData.stock) || 0;
    const today = new Date();

    if (isNaN(price) || price < 0) {
      Alert.alert("Validation Error", "Please enter a valid price");
      return;
    }

    if (stock < 0) {
      Alert.alert("Validation Error", "Stock quantity cannot be negative");
      return;
    }

    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: price,
      stock: stock,
      imageUrl: formData.imageUrl.trim(),
      size: formData.size.trim(),
      updatedAt: today.toISOString(),
    };

    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...editingProduct, ...productData } : p
        )
      );
      Alert.alert("Success", "Product updated successfully!");
    } else {
      // Create new product (simulate cuid generation)

      const newProduct: Product = {
        id: `cuid_prod_${Date.now()}`,
        ...productData,
        createdAt: today.toISOString(), // ✅ convert to string
        updatedAt: today.toISOString(), // ✅ ensure updatedAt is also string
      };
      setProducts([newProduct, ...products]);
      Alert.alert("Success", "Product created successfully!");
    }

    setModalVisible(false);
    resetForm();
  };

  const handleDelete = (product: Product): void => {
    Alert.alert(
      "Delete Product",
      `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setProducts(products.filter((p) => p.id !== product.id));
            Alert.alert("Success", "Product deleted successfully!");
          },
        },
      ]
    );
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStockStatus = (stock: number): StockStatus => {
    if (stock === 0) return { text: "Out of Stock", color: "text-red-600" };
    if (stock < 10) return { text: "Low Stock", color: "text-orange-600" };
    return { text: "In Stock", color: "text-green-600" };
  };

  const renderProduct: ListRenderItem<Product> = ({ item }) => {
    const stockStatus = getStockStatus(item.stock);

    return (
      <View className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
        <View className="flex-row">
          <Image
            source={{
              uri:
                item.imageUrl ||
                "https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=No+Image",
            }}
            className="w-16 h-16 rounded-md bg-gray-100"
            resizeMode="cover"
          />
          <View className="flex-1 ml-3">
            <Text className="text-base font-medium text-gray-900 mb-1">
              {item.name}
            </Text>
            <Text className="text-xs text-gray-500 mb-2" numberOfLines={1}>
              {item.description}
            </Text>
            <View className="flex-row items-center justify-between mt-1">
              <Text className="text-lg font-semibold text-gray-900">
                ${item.price.toFixed(2)}
              </Text>
              <View className="flex-row items-center">
                <Text
                  className={`text-xs font-medium ${
                    stockStatus.color === "text-red-600"
                      ? "text-red-500"
                      : stockStatus.color === "text-orange-600"
                      ? "text-amber-500"
                      : "text-emerald-500"
                  }`}
                >
                  {stockStatus.text}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-3 pt-2 border-t border-gray-50">
          <View className="flex-row items-center space-x-2">
            {item.size && (
              <Text className="text-xs text-gray-500">Size: {item.size}</Text>
            )}
          </View>

          <View className="flex-row space-x-2">
            <TouchableOpacity
              className="px-3 py-1.5 rounded-md bg-gray-50"
              onPress={() => openEditModal(item)}
            >
              <Text className="text-gray-700 text-sm">Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-3 py-1.5 rounded-md bg-gray-50"
              onPress={() => handleDelete(item)}
            >
              <Text className="text-red-500 text-sm">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Calculate total value of all products
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);

  // Calculate number of out of stock products
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  return (
    <SafeAreaView className="flex-1 mt-10 bg-gray-50">
      {/* Header */}
      <View className="px-5 py-4 border-b border-gray-100">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-semibold text-gray-900">Products</Text>
          <TouchableOpacity
            className="px-4 py-2 rounded-md bg-gray-900"
            onPress={openCreateModal}
          >
            <Text className="text-white font-medium text-sm">Add Product</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Cards - Simplified */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-5 py-3"
      >
        <View className="flex-row space-x-3">
          <View className="bg-white p-4 rounded-lg min-w-[100px] shadow-sm">
            <Text className="text-lg font-semibold text-gray-900">
              {products.length}
            </Text>
            <Text className="text-xs text-gray-500 mb-2">Products</Text>
          </View>

          <View className="bg-white p-4 rounded-lg min-w-[100px] shadow-sm">
            <Text className="text-lg font-semibold text-gray-900">
              ${totalValue.toFixed(0)}
            </Text>
            <Text className="text-xs text-gray-500 mb-2">Value</Text>
          </View>

          <View className="bg-white p-4 rounded-lg min-w-[100px] shadow-sm">
            <Text className="text-lg font-semibold text-gray-900">
              {outOfStockCount}
            </Text>
            <Text className="text-xs text-gray-500 mb-2">Out of Stock</Text>
          </View>
        </View>
      </ScrollView>

      {/* Products List */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="bg-white rounded-lg p-8 items-center mt-8">
            <Text className="text-gray-500 mb-2">No products found</Text>
            <Text className="text-gray-400 text-sm">
              Add your first product
            </Text>
          </View>
        }
      />

      {/* Product Form Modal - Modernized */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          resetForm();
        }}
      >
        <View className="flex-1 bg-black/30 justify-center items-center p-5">
          <View className="bg-white rounded-xl p-5 w-full max-w-md">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              {editingProduct ? "Edit Product" : "New Product"}
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              className="space-y-4"
            >
              <View>
                <Text className="text-sm text-gray-500 mb-1">Name *</Text>
                <TextInput
                  className="border-b border-gray-200 pb-2 text-base"
                  value={formData.name}
                  onChangeText={(text) =>
                    setFormData({ ...formData, name: text })
                  }
                  placeholder="Product name"
                />
              </View>

              <View>
                <Text className="text-sm text-gray-500 mb-1">Description</Text>
                <TextInput
                  className="border-b border-gray-200 pb-2 text-base h-16"
                  value={formData.description}
                  onChangeText={(text) =>
                    setFormData({ ...formData, description: text })
                  }
                  placeholder="Product description"
                  multiline
                />
              </View>

              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-sm text-gray-500 mb-1">Price *</Text>
                  <TextInput
                    className="border-b border-gray-200 pb-2 text-base"
                    value={formData.price}
                    onChangeText={(text) =>
                      setFormData({ ...formData, price: text })
                    }
                    placeholder="0.00"
                    keyboardType="decimal-pad"
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-sm text-gray-500 mb-1">Stock</Text>
                  <TextInput
                    className="border-b border-gray-200 pb-2 text-base"
                    value={formData.stock}
                    onChangeText={(text) =>
                      setFormData({ ...formData, stock: text })
                    }
                    placeholder="0"
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <View>
                <Text className="text-sm text-gray-500 mb-2">
                  Product Image
                </Text>

                <TouchableOpacity
                  className="bg-gray-100 rounded-md h-32 items-center justify-center"
                  onPress={selectImage}
                >
                  {formData.imageUrl ? (
                    <Image
                      source={{ uri: formData.imageUrl }}
                      className="w-full h-full rounded-md"
                      resizeMode="cover"
                    />
                  ) : (
                    <Text className="text-gray-500">Tap to select image</Text>
                  )}
                </TouchableOpacity>
              </View>

              <View>
                <Text className="text-sm text-gray-500 mb-1">Size</Text>
                <TextInput
                  className="border-b border-gray-200 pb-2 text-base"
                  value={formData.size}
                  onChangeText={(text) =>
                    setFormData({ ...formData, size: text })
                  }
                  placeholder="One Size"
                />
              </View>
            </ScrollView>

            <View className="flex-row justify-end space-x-3 mt-6">
              <TouchableOpacity
                className="px-4 py-2"
                onPress={() => {
                  setModalVisible(false);
                  resetForm();
                }}
              >
                <Text className="text-gray-500">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="px-4 py-2 bg-gray-900 rounded-md"
                onPress={handleSave}
              >
                <Text className="text-white">
                  {editingProduct ? "Update" : "Create"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
