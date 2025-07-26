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
    const [showAllOrders, setShowAllOrders] = useState(false);

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
            imageUrl: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            id: "",
            createdAt: "",
            updatedAt: "",
            price: 0,
            description: "",
            stock: 0,
            size: ""
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

 const renderOrderItem = ({ item: order }: { item: types.Order }) => (
  <View className="bg-[#303030] rounded-xl p-4 mx-4 mb-4 border border-[#facc15]">
    {/* Header */}
    <View className="flex-row justify-between items-start mb-3">
      <View className="flex-1">
        <Text className="text-sm text-white">Order #{order.id.slice(-6)}</Text>
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

    {/* Order Items */}
    <View className="border-l-2 border-gray-600 pl-4 mb-3">
      {order.orderItems.map((item: types.OrderItem, index: number) => (
        <View key={item.id} className="flex-row items-center mb-2">
          <Image
            source={{ uri: item?.product?.imageUrl }}
            style={styles.orderItemImage}
            resizeMode="contain"
          />
          <View className="flex-1 ml-3">
            <Text
              className="text-sm font-medium text-white"
              numberOfLines={1}
            >
              {item?.product?.name}
            </Text>
            <Text className="text-xs text-gray-400">
              Qty: {item.quantity} × ${item.price.toFixed(2)}
            </Text>
          </View>
        </View>
      ))}
    </View>

    {/* Total */}
    <View className="flex-row justify-between items-center pt-3 border-t border-gray-700">
      <Text className="text-sm text-gray-300">Total</Text>
      <Text className="text-lg font-bold text-green-400">
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
        <View className="relative rounded-2xl mx-4 mb-6 overflow-hidden">
  {/* Background layer with opacity */}
  <View className="absolute inset-0 bg-[#303030] opacity-70" />

  {/* Foreground content */}
  <View className="relative rounded-2xl p-6 border border-[#facc15]">
    <View className="flex-row justify-between items-center mb-5">
      <Text className="text-xl font-bold text-white">Personal Information</Text>
      {!isEditing ? (
        <TouchableOpacity
          onPress={() => setIsEditing(true)}
          className="flex-row items-center"
        >
          <Ionicons name="pencil" size={16} color="#facc15" />
          <Text className="text-[#facc15] ml-1 font-medium">Edit</Text>
        </TouchableOpacity>
      ) : (
        <View className="flex-row">
          <TouchableOpacity onPress={handleCancelEdit} className="mr-4">
            <Text className="text-gray-400 font-medium">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSaveProfile}>
            <Text className="text-[#facc15] font-semibold">Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>

    {/* Phone Number (Not editable) */}
    <View className="mb-4">
      <Text className="text-sm text-gray-400 mb-1">Phone Number</Text>
      <View className="flex-row items-center">
        <Text className="text-base text-white">{userProfile.phoneNumber}</Text>
        <View className="bg-gray-700 px-2 py-0.5 rounded ml-2">
          <Text className="text-xs text-gray-300">Not editable</Text>
        </View>
      </View>
    </View>

    {/* First Name */}
    <View className="mb-4">
      <Text className="text-sm text-gray-400 mb-1">First Name</Text>
      {isEditing ? (
        <TextInput
          value={editedProfile.firstName}
          onChangeText={(text) =>
            setEditedProfile((prev) => ({ ...prev, firstName: text }))
          }
          className="border border-gray-600 rounded-lg px-3 py-2 text-base text-white"
          placeholder="Enter first name"
          placeholderTextColor="#9CA3AF"
        />
      ) : (
        <Text className="text-base text-white">{userProfile.firstName}</Text>
      )}
    </View>

    {/* Last Name */}
    <View className="mb-4">
      <Text className="text-sm text-gray-400 mb-1">Last Name</Text>
      {isEditing ? (
        <TextInput
          value={editedProfile.lastName}
          onChangeText={(text) =>
            setEditedProfile((prev) => ({ ...prev, lastName: text }))
          }
          className="border border-gray-600 rounded-lg px-3 py-2 text-base  text-white"
          placeholder="Enter last name"
          placeholderTextColor="#9CA3AF"
        />
      ) : (
        <Text className="text-base text-white">{userProfile.lastName}</Text>
      )}
    </View>

    {/* Role (Not editable) */}
    <View className="mb-4">
      <Text className="text-sm text-gray-400 mb-1">Role</Text>
      <View className="flex-row items-center">
        <Text className="text-base text-white">{userProfile.role}</Text>
        <View className="bg-gray-700 px-2 py-0.5 rounded ml-2">
          <Text className="text-xs text-gray-300">Not editable</Text>
        </View>
      </View>
    </View>

    {/* Last Login */}
    <View>
      <Text className="text-sm text-gray-400 mb-1">Last Login</Text>
      <Text className="text-base text-white">
        {formatDate(userProfile.lastLogin)}
      </Text>
    </View>
  </View>
</View>



        {/* Order History */}
        <View className="mx-4 mb-6">
  <View className="flex-row justify-between items-center mb-4">
    <Text className="text-lg font-semibold text-white">Order History</Text>
    {previousOrders.length > 2 && !showAllOrders && (
      <TouchableOpacity onPress={() => setShowAllOrders(true)}>
        <Text className="text-[#facc15] font-medium">View More</Text>
      </TouchableOpacity>
    )}
  </View>

  {previousOrders.length === 0 ? (
    <View className="bg-[#303030] rounded-xl p-8 items-center border border-[#facc15]">
      <Ionicons name="receipt-outline" size={48} color="#9CA3AF" />
      <Text className="text-gray-400 mt-2">No previous orders</Text>
    </View>
  ) : (
    <FlatList
      data={showAllOrders ? previousOrders : previousOrders.slice(0, 2)}
      keyExtractor={(item) => item.id}
      renderItem={renderOrderItem}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  )}
</View>

        {/* Account Statistics */}
        <View className="bg-[#303030] rounded-xl mx-4 mb-6 p-6 border border-[#facc15]">
          <Text className="text-lg font-semibold text-white mb-4">
            Account Statistics
          </Text>

          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-gray-400">Total Orders</Text>
            <Text className="font-semibold text-white">{previousOrders.length}</Text>
          </View>

          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-gray-400">Total Spent</Text>
            <Text className="font-semibold text-green-400">
              $
              {previousOrders
                .reduce((sum, order) => sum + order.totalPrice, 0)
                .toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-gray-400">Member Since</Text>
            <Text className="font-semibold text-white">
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
