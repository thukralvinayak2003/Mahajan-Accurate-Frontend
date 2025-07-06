import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import * as types from "../../zod";

import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  // User profile data based on your Prisma schema
  const [userProfile, setUserProfile] = useState({
    id: "user1",
    phoneNumber: "+1234567890", // Not changeable
    firstName: "John",
    lastName: "Doe",
    role: "USER", // Not changeable
    createdAt: "2024-01-15T10:30:00Z",
    lastLogin: "2024-06-08T08:45:00Z",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
  });

  // Previous orders based on your schema
  const [previousOrders] = useState<types.Order[]>([
    {
      id: "order1",
      userId: "user1",
      totalPrice: 95.98,
      status: "COMPLETED" as types.OrderStatus,
      createdAt: "2024-06-05T14:30:00Z",
      updatedAt: "2024-06-05T15:00:00Z",
      shippingAddress: "123 Main St, City, State 12345",
      orderItems: [
        {
          id: "item1",
          orderId: "order1",
          productId: "product1",
          quantity: 2,
          price: 35.99,
          product: {
            name: "Mountain Bike Tire",
            imageUrl:
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
          },
        },
        {
          id: "item2",
          orderId: "order1",
          productId: "product2",
          quantity: 1,
          price: 24.5,
          product: {
            name: "Bicycle Chain 11-Speed",
            imageUrl:
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
          },
        },
      ],
    },
    {
      id: "order2",
      userId: "user1",
      totalPrice: 59.99,
      status: "COMPLETED" as types.OrderStatus,
      createdAt: "2024-05-28T09:15:00Z",
      updatedAt: "2024-05-28T10:00:00Z",
      shippingAddress: "123 Main St, City, State 12345",
      orderItems: [
        {
          id: "item3",
          orderId: "order2",
          productId: "product3",
          quantity: 1,
          price: 59.99,
          product: {
            name: "Carbon Fiber Handlebar",
            imageUrl:
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
          },
        },
      ],
    },
    {
      id: "order3",
      userId: "user1",
      totalPrice: 89.99,
      status: "PENDING" as types.OrderStatus,
      createdAt: "2024-06-07T16:20:00Z",
      updatedAt: "2024-06-07T16:30:00Z",
      shippingAddress: "123 Main St, City, State 12345",
      orderItems: [
        {
          id: "item4",
          orderId: "order3",
          productId: "product4",
          quantity: 1,
          price: 89.99,
          product: {
            name: "Disc Brake Set",
            imageUrl:
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
          },
        },
      ],
    },
  ]);

  const tabBarHeight = useBottomTabBarHeight();

  const formatDate = (dateString : string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const handleSaveProfile = () => {
    if (!editedProfile.firstName.trim() || !editedProfile.lastName.trim()) {
      Alert.alert("Error", "First name and last name cannot be empty.");
      return;
    }

    setUserProfile((prev) => ({
      ...prev,
      firstName: editedProfile.firstName.trim(),
      lastName: editedProfile.lastName.trim(),
    }));
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditedProfile({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
    });
    setIsEditing(false);
  };

  const getStatusColor = (status : string) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-600";
      case "PENDING":
        return "text-yellow-600";
      case "CANCELLED":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBgColor = (status : string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100";
      case "PENDING":
        return "bg-yellow-100";
      case "CANCELLED":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  };

  const renderOrderItem = ({ item: order  }  : {item : types.Order}) => (
    <View className="bg-white rounded-xl p-4 mx-4 mb-4 shadow-sm">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-sm text-gray-500">
            Order #{order.id.slice(-6)}
          </Text>
          <Text className="text-xs text-gray-400 mt-1">
            {formatDate(order.createdAt)}
          </Text>
        </View>
        <View
          className={`px-3 py-1 rounded-full ${getStatusBgColor(order.status)}`}
        >
          <Text
            className={`text-xs font-semibold ${getStatusColor(order.status)}`}
          >
            {order.status}
          </Text>
        </View>
      </View>

      <View className="border-l-2 border-gray-200 pl-4 mb-3">
        {order.orderItems.map((item : types.OrderItem, index : number) => (
          <View key={item.id} className="flex-row items-center mb-2">
            <Image
              source={{ uri: item?.product?.imageUrl }}
              style={styles.orderItemImage}
              resizeMode="contain"
            />
            <View className="flex-1 ml-3">
              <Text className="text-sm font-medium" numberOfLines={1}>
                {item?.product?.name}
              </Text>
              <Text className="text-xs text-gray-500">
                Qty: {item.quantity} × ${item.price.toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
        <Text className="text-sm text-gray-600">Total</Text>
        <Text className="text-lg font-bold text-green-600">
          ${order.totalPrice.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
      >
        {/* Header */}
        <View className="pt-8 p-2 mb-2">
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
        </View>

        {/* Profile Information */}
        <View className="bg-white rounded-xl mx-4 mb-6 p-6 shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-gray-800">
              Personal Information
            </Text>
            {!isEditing ? (
              <TouchableOpacity
                onPress={() => setIsEditing(true)}
                className="flex-row items-center"
              >
                <Ionicons name="pencil" size={16} color="#3B82F6" />
                <Text className="text-blue-500 ml-1">Edit</Text>
              </TouchableOpacity>
            ) : (
              <View className="flex-row">
                <TouchableOpacity onPress={handleCancelEdit} className="mr-4">
                  <Text className="text-gray-500">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveProfile}>
                  <Text className="text-blue-500 font-semibold">Save</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Phone Number (Not editable) */}
          <View className="mb-4">
            <Text className="text-sm text-gray-500 mb-1">Phone Number</Text>
            <View className="flex-row items-center">
              <Text className="text-base text-gray-800">
                {userProfile.phoneNumber}
              </Text>
              <View className="bg-gray-100 px-2 py-1 rounded ml-2">
                <Text className="text-xs text-gray-500">Not editable</Text>
              </View>
            </View>
          </View>

          {/* First Name */}
          <View className="mb-4">
            <Text className="text-sm text-gray-500 mb-1">First Name</Text>
            {isEditing ? (
              <TextInput
                value={editedProfile.firstName}
                onChangeText={(text) =>
                  setEditedProfile((prev) => ({ ...prev, firstName: text }))
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-base"
                placeholder="Enter first name"
              />
            ) : (
              <Text className="text-base text-gray-800">
                {userProfile.firstName}
              </Text>
            )}
          </View>

          {/* Last Name */}
          <View className="mb-4">
            <Text className="text-sm text-gray-500 mb-1">Last Name</Text>
            {isEditing ? (
              <TextInput
                value={editedProfile.lastName}
                onChangeText={(text) =>
                  setEditedProfile((prev) => ({ ...prev, lastName: text }))
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-base"
                placeholder="Enter last name"
              />
            ) : (
              <Text className="text-base text-gray-800">
                {userProfile.lastName}
              </Text>
            )}
          </View>

          {/* Role (Not editable) */}
          <View className="mb-4">
            <Text className="text-sm text-gray-500 mb-1">Role</Text>
            <View className="flex-row items-center">
              <Text className="text-base text-gray-800">
                {userProfile.role}
              </Text>
              <View className="bg-gray-100 px-2 py-1 rounded ml-2">
                <Text className="text-xs text-gray-500">Not editable</Text>
              </View>
            </View>
          </View>

          {/* Last Login */}
          <View>
            <Text className="text-sm text-gray-500 mb-1">Last Login</Text>
            <Text className="text-base text-gray-800">
              {formatDate(userProfile.lastLogin)}
            </Text>
          </View>
        </View>

        {/* Order History */}
        <View className="mx-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Order History
          </Text>
          {previousOrders.length === 0 ? (
            <View className="bg-white rounded-xl p-8 items-center shadow-sm">
              <Ionicons name="receipt-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 mt-2">No previous orders</Text>
            </View>
          ) : (
            <FlatList
              data={previousOrders}
              keyExtractor={(item) => item.id}
              renderItem={renderOrderItem}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        {/* Account Statistics */}
        <View className="bg-white rounded-xl mx-4 mb-6 p-6 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Account Statistics
          </Text>
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-gray-600">Total Orders</Text>
            <Text className="font-semibold">{previousOrders.length}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-gray-600">Total Spent</Text>
            <Text className="font-semibold text-green-600">
              $
              {previousOrders
                .reduce((sum, order) => sum + order.totalPrice, 0)
                .toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">Member Since</Text>
            <Text className="font-semibold">
              {formatDate(userProfile.createdAt)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  orderItemImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: "#f3f4f6",
  },
});

export default Profile;
