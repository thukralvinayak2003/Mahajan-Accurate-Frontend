import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function OverviewTab() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header Section */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900">Welcome !</Text>
          <Text className="text-base text-gray-600 mt-1">
            Here is an overview of your dashboard
          </Text>
        </View>

        {/* Stats Section */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-white rounded-lg p-4 items-center flex-1 mx-1 shadow-sm">
            <Ionicons name="people-outline" size={24} color="#4B5563" />
            <Text className="text-xl font-bold text-gray-900 mt-2">1,234</Text>
            <Text className="text-sm text-gray-600 mt-1">Total Users</Text>
          </View>
          <View className="bg-white rounded-lg p-4 items-center flex-1 mx-1 shadow-sm">
            <Ionicons name="cart-outline" size={24} color="#4B5563" />
            <Text className="text-xl font-bold text-gray-900 mt-2">567</Text>
            <Text className="text-sm text-gray-600 mt-1">Orders</Text>
          </View>
          <View className="bg-white rounded-lg p-4 items-center flex-1 mx-1 shadow-sm">
            <Ionicons name="trending-up-outline" size={24} color="#4B5563" />
            <Text className="text-xl font-bold text-gray-900 mt-2">
              $12,345
            </Text>
            <Text className="text-sm text-gray-600 mt-1">Revenue</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Quick Actions
          </Text>
          <View className="flex-row justify-between">
            <Link href="/dashboard/products" asChild>
              <TouchableOpacity className="flex-1 bg-blue-500 rounded-lg p-3 flex-row items-center justify-center mx-1">
                <Ionicons name="cog-outline" size={20} color="#FFF" />
                <Text className="text-white text-base font-medium ml-2">
                  Manage Products
                </Text>
              </TouchableOpacity>
            </Link>
            <Link href="/dashboard/orders" asChild>
              <TouchableOpacity className="flex-1 bg-blue-500 rounded-lg p-3 flex-row items-center justify-center mx-1">
                <Ionicons name="cash-outline" size={20} color="#FFF" />
                <Text className="text-white text-base font-medium ml-2">
                  View Orders
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="bg-white rounded-lg p-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Recent Activity
          </Text>
          <View className="flex-row justify-between py-2 border-b border-gray-200">
            <Text className="text-sm text-gray-900">
              User John Doe registered
            </Text>
            <Text className="text-xs text-gray-600">2 hours ago</Text>
          </View>
          <View className="flex-row justify-between py-2 border-b border-gray-200">
            <Text className="text-sm text-gray-900">Order #1234 placed</Text>
            <Text className="text-xs text-gray-600">4 hours ago</Text>
          </View>
          <View className="flex-row justify-between py-2">
            <Text className="text-sm text-gray-900">
              Admin updated settings
            </Text>
            <Text className="text-xs text-gray-600">Yesterday</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
