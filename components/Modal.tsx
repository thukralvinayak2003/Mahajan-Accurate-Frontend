// components/ProductModal.tsx

import { ProductModalProps } from "@/types";
import React from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


const ProductModal: React.FC<ProductModalProps> = ({
  modalVisible,
  setModalVisible,
  editingProduct,
  formData,
  setFormData,
  selectImage,
  resetForm,
  handleSave,
}) => {
  return (
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
              <Text className="text-sm text-gray-500 mb-2">Product Image</Text>

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
  );
};

export default ProductModal;
