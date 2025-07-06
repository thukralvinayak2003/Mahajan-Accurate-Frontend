import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import * as types from "../../zod";

import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Cart = () => {
  // Using dummy data based on your products schema
  const [cartItems, setCartItems] = useState<types.OrderItem[]>([
    {
      id: "cart1",
      orderId: "order1",
      productId: "prod1",
      quantity: 2,
      price: 35.99,
      product: {
        id: "prod1",
        price: 35.99,
        name: "Mountain Bike Tire",
        stock: 40,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        description: "29-inch all-terrain tire suitable for mountain bikes.",
        imageUrl:
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        size: '29"',
      },
    },
    {
      id: "cart2",
      orderId: "order1",
      productId: "prod2",
      quantity: 1,
      price: 24.5,
      product: {
        id: "prod2",
        price: 24.5,
        name: "Bicycle Chain 11-Speed",
        stock: 75,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        description:
          "Durable 11-speed chain compatible with Shimano and SRAM systems.",
        imageUrl:
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        size: undefined,
      },
    },
    {
      id: "cart3",
      orderId: "order1",
      productId: "prod3",
      quantity: 1,
      price: 59.99,
      product: {
        id: "prod3",
        price: 59.99,
        name: "Carbon Fiber Handlebar",
        stock: 15,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        description: "Lightweight carbon handlebar for road bikes.",
        imageUrl:
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        size: "42cm",
      },
    },
  ]);

  const tabBarHeight = useBottomTabBarHeight();

  const updateQuantity = (itemId : string , newQuantity : number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId : string) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setCartItems((prev) => prev.filter((item) => item.id !== itemId));
          },
        },
      ]
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item!.product!.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Empty Cart",
        "Please add items to your cart before checkout."
      );
      return;
    }
    Alert.alert(
      "Checkout",
      `Total: $${getTotalPrice().toFixed(2)}\n\nProceed with checkout?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Checkout",
          onPress: () => {
            // Here you would typically navigate to checkout screen or process payment
            Alert.alert("Success", "Order placed successfully!");
            setCartItems([]); // Clear cart after successful order
          },
        },
      ]
    );
  };

  const renderCartItem = ({ item : item } :{item : types.OrderItem}) => (
    <View className="bg-white rounded-xl p-4 mx-4 mb-4 shadow-sm">
      <View className="flex-row">
        <Image
          source={{ uri: item?.product?.imageUrl }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View className="flex-1 ml-4">
          <Text
            className="text-lg font-semibold text-gray-800"
            numberOfLines={2}
          >
            {item?.product?.name}
          </Text>
          <Text className="text-sm text-gray-600 mt-1" numberOfLines={2}>
            {item?.product?.description}
          </Text>
          {item?.product?.size && (
            <Text className="text-sm text-blue-600 mt-1">
              Size: {item.product.size}
            </Text>
          )}
          <View className="flex-row justify-between items-center mt-3">
            <Text className="text-lg font-bold text-green-600">
              ${item?.product?.price.toFixed(2)}
            </Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-200 rounded-full w-8 h-8 justify-center items-center"
              >
                <Ionicons name="remove" size={16} color="#374151" />
              </TouchableOpacity>
              <Text className="mx-4 text-lg font-semibold">
                {item.quantity}
              </Text>
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-blue-500 rounded-full w-8 h-8 justify-center items-center"
              >
                <Ionicons name="add" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-base font-semibold">
              Subtotal: ${(item!.product!.price * item.quantity).toFixed(2)}
            </Text>
            <TouchableOpacity
              onPress={() => removeItem(item.id)}
              className="p-2"
            >
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const renderEmptyCart = () => (
    <View className="flex-1 justify-center items-center px-8">
      <Ionicons name="cart-outline" size={80} color="#9CA3AF" />
      <Text className="text-xl font-semibold text-gray-600 mt-4 text-center">
        Your cart is empty
      </Text>
      <Text className="text-gray-500 mt-2 text-center">
        Add some items to your cart to get started
      </Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center pt-8 p-2 ">
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
          {cartItems.length > 0 && (
            <View className="bg-blue-500 rounded-full px-3 py-1">
              <Text className="text-white font-semibold">
                {cartItems.length}
              </Text>
            </View>
          )}
        </View>

        {cartItems.length === 0 ? (
          renderEmptyCart()
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id}
              renderItem={renderCartItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 120 + tabBarHeight,
              }}
            />

            {/* Checkout Section */}
            <View
              className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4  mb-5"
              style={{ paddingBottom: tabBarHeight + 20 }}
            >
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold">Total Items:</Text>
                <Text className="text-lg">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold">Total Price:</Text>
                <Text className="text-xl font-bold text-green-600">
                  ${getTotalPrice().toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleCheckout}
                className="bg-blue-500 rounded-xl py-4 items-center"
              >
                <Text className="text-white text-lg font-semibold">
                  Proceed to Checkout
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
});

export default Cart;
