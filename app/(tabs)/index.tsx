import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";

const Home = () => {
  const dummyData = [
    {
      name: "Mountain Bike Tire",
      description: "29-inch all-terrain tire suitable for mountain bikes.",
      price: 35.99,
      stock: 40,
      imageUrl:
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      size: '29"',
    },
    {
      name: "Bicycle Chain 11-Speed",
      description:
        "Durable 11-speed chain compatible with Shimano and SRAM systems.",
      price: 24.5,
      stock: 75,
      imageUrl:
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      size: null,
    },
    {
      name: "Disc Brake Set",
      description: "Hydraulic disc brake set with rotors for front and rear.",
      price: 89.99,
      stock: 20,
      imageUrl:
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      size: null,
    },
    {
      name: "Carbon Fiber Handlebar",
      description: "Lightweight carbon handlebar for road bikes.",
      price: 59.99,
      stock: 15,
      imageUrl:
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      size: "42cm",
    },
    {
      name: "Saddle (Comfort Gel)",
      description: "Ergonomic bike seat with gel padding for long rides.",
      price: 29.99,
      stock: 60,
      imageUrl:
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      size: null,
    },
    {
      name: "Bike Pedals (Aluminum)",
      description: "Flat platform pedals with anti-slip grip.",
      price: 18.99,
      stock: 80,
      imageUrl:
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      size: null,
    },
    {
      name: "Rear Derailleur (Shimano Altus)",
      description: "Reliable 7/8-speed rear derailleur for mountain bikes.",
      price: 34.99,
      stock: 50,
      imageUrl:
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      size: null,
    },
    {
      name: "Bicycle Tube (700x25c)",
      description: "Presta valve inner tube for road bikes.",
      price: 7.99,
      stock: 120,
      imageUrl:
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      size: "700x25c",
    },
    {
      name: "Front Light Rechargeable",
      description: "USB rechargeable LED headlight for night riding.",
      price: 22.99,
      stock: 90,
      imageUrl:
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      size: null,
    },
    {
      name: "Bike Lock (U-Lock)",
      description: "Heavy-duty anti-theft U-lock with mount and keys.",
      price: 27.5,
      stock: 35,
      imageUrl:
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      size: null,
    },
  ];
  const tabBarHeight = useBottomTabBarHeight();
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View className="w-full flex-row justify-center mt-4 items-center">
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </View>
      <View className="mb-4">
        <SearchBar
          onPress={() => {
            router.push("/search");
          }}
          placeholder="Search....."
        />
      </View>
      <FlatList
        data={dummyData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <Card item={item} />}
        contentContainerStyle={[
          styles.container,
          { paddingBottom: tabBarHeight + 20 },
        ]}
      />
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 16,
  },
  container: {
    paddingVertical: 20,
  },
});
