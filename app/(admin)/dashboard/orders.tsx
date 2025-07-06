import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const dummyOrders = [
  {
    id: "order1",
    userId: "user1",
    totalPrice: 99.99,
    status: "PENDING",
    shippingAddress: "123 Main St, City, Country",
    createdAt: "2025-06-27T10:00:00Z",
    orderItems: [
      {
        id: "item1",
        productId: "prod1",
        quantity: 2,
        price: 29.99,
        product: { name: "Product A" },
      },
      {
        id: "item2",
        productId: "prod2",
        quantity: 1,
        price: 40.01,
        product: { name: "Product B" },
      },
    ],
  },
  {
    id: "order2",
    userId: "user2",
    totalPrice: 149.5,
    status: "COMPLETED",
    shippingAddress: "456 Oak Ave, City, Country",
    createdAt: "2025-06-26T15:30:00Z",
    orderItems: [
      {
        id: "item3",
        productId: "prod3",
        quantity: 3,
        price: 49.5,
        product: { name: "Product C" },
      },
    ],
  },
];

export default function OrdersTab() {
  const [filter, setFilter] = useState("ALL");

  const filteredOrders =
    filter === "ALL"
      ? dummyOrders
      : dummyOrders.filter((order) => order.status === filter);

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4 pt-4">
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View className="mb-6">
              <Text className="text-2xl font-bold text-gray-900">Orders</Text>
              <Text className="text-base text-gray-600 mt-1">
                View and manage your orders
              </Text>
            </View>

            {/* Status Filter */}
            <View className="flex-row justify-between mb-4">
              {["ALL", "PENDING", "COMPLETED"].map((status) => (
                <TouchableOpacity
                  key={status}
                  className={`flex-1 mx-1 py-2 rounded-lg ${
                    filter === status ? "bg-blue-500" : "bg-gray-200"
                  }`}
                  onPress={() => setFilter(status)}
                >
                  <Text
                    className={`text-center text-sm font-medium ${
                      filter === status ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        renderItem={({ item }) => (
          <Link href={`/orders/${item.id}`} asChild>
            <TouchableOpacity className="bg-white rounded-lg p-4 mb-3 shadow-sm">
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-base font-semibold text-gray-900">
                    Order #{item.id.slice(0, 8)}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Total: ${item.totalPrice.toFixed(2)}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Status: {item.status}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Date: {new Date(item.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#4B5563"
                />
              </View>
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={
          <View className="items-center py-6">
            <Text className="text-base text-gray-600">No orders found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
