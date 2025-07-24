import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import { Product } from "@/zod";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Text,
  View,
} from "react-native";
const dummyData = [
  {
    id: 1,
    name: "Mountain Bike Tire",
    description: "29-inch all-terrain tire suitable for mountain bikes.",
    price: 35.99,
    stock: 40,
    imageUrl:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    size: '29"',
  },
  {
    id: 2,
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
    id: 3,
    name: "Disc Brake Set",
    description: "Hydraulic disc brake set with rotors for front and rear.",
    price: 89.99,
    stock: 20,
    imageUrl:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    size: null,
  },
  {
    id: 4,
    name: "Carbon Fiber Handlebar",
    description: "Lightweight carbon handlebar for road bikes.",
    price: 59.99,
    stock: 15,
    imageUrl:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    size: "42cm",
  },
  {
    id: 5,
    name: "Saddle (Comfort Gel)",
    description: "Ergonomic bike seat with gel padding for long rides.",
    price: 29.99,
    stock: 60,
    imageUrl:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    size: null,
  },
  {
    id: 6,
    name: "Bike Pedals (Aluminum)",
    description: "Flat platform pedals with anti-slip grip.",
    price: 18.99,
    stock: 80,
    imageUrl:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    size: null,
  },
  {
    id: 7,
    name: "Rear Derailleur (Shimano Altus)",
    description: "Reliable 7/8-speed rear derailleur for mountain bikes.",
    price: 34.99,
    stock: 50,
    imageUrl:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    size: null,
  },
  {
    id: 8,
    name: "Bicycle Tube (700x25c)",
    description: "Presta valve inner tube for road bikes.",
    price: 7.99,
    stock: 120,
    imageUrl:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    size: "700x25c",
  },
  {
    id: 9,
    name: "Front Light Rechargeable",
    description: "USB rechargeable LED headlight for night riding.",
    price: 22.99,
    stock: 90,
    imageUrl:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    size: null,
  },
  {
    id: 10,
    name: "Bike Lock (U-Lock)",
    description: "Heavy-duty anti-theft U-lock with mount and keys.",
    price: 27.5,
    stock: 35,
    imageUrl:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    size: null,
  },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<FormData[]>([]); // here is problem for the error ---- 
  const [loading, setLoading] = useState(false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(true);

      if (searchQuery.trim()) {
        const filtered = dummyData.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }

      setTimeout(() => setLoading(false), 200); // Simulate loading
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      resizeMode="cover"
      className="flex-1 relative"
    >
      {/* Background Image */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        }}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        className="px-2"
        data={filteredProducts}
        keyExtractor={(item : Product) => item.id.toString()}
        renderItem={({ item }) => <Card item={item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 4,
          marginVertical: 4,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-4 items-center">
              <Image
                source={require("../../assets/images/logo.png")}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
            </View>

            <View className="">
              <SearchBar
                placeholder="Search....."
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#3B82F6"
                className="my-3"
              />
            )}

            {!loading && searchQuery.trim() && filteredProducts.length > 0 && (
              <View className="mx-5 mb-3">
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-blue-400">{searchQuery}</Text>
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "item" : "items"} found
                </Text>
              </View>
            )}
          </>
        }
        ListEmptyComponent={
          !loading ? (
            <View className="mt-10 px-5">
              <View className="bg-gray-800 rounded-lg p-6 items-center">
                <Text className="text-4xl mb-3">🔍</Text>
                <Text className="text-center text-white text-lg font-semibold mb-2">
                  {searchQuery.trim() ? "No Parts Found" : "Find Your Parts"}
                </Text>
                <Text className="text-center text-gray-400">
                  {searchQuery.trim()
                    ? `No bicycle parts match "${searchQuery}"`
                    : "Start typing to search through our bicycle parts inventory"}
                </Text>
              </View>
            </View>
          ) : null
        }
      />
    </ImageBackground>
  );
};

export default Search;
