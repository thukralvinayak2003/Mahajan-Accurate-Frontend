import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Card = ({ item }: { item: any }) => {
  const [quantity, setQuantity] = useState("1");

  const handleAddToCart = () => {
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      Alert.alert("Invalid Quantity", "Please enter a valid quantity.");
      return;
    }

    if (qty > item.stock) {
      Alert.alert("Not enough stock", `Only ${item.stock} available.`);
      return;
    }

    // Your cart logic here
    Alert.alert("Success", `${qty} x ${item.name} added to cart!`);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.stock}>Stock: {item.stock}</Text>
      {item.size && <Text style={styles.size}>Size: {item.size}</Text>}

      <View style={styles.cartSection}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={3}
          value={quantity}
          onChangeText={(text) => {
            const val = parseInt(text, 10);
            if (!text || (val >= 0 && val <= item.stock)) setQuantity(text);
          }}
          placeholder="Qty"
        />
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Ionicons name="cart" size={22} color="#fff" />
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    color: "#666",
    marginBottom: 4,
  },
  price: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  stock: {
    color: "#333",
  },
  size: {
    color: "#555",
    fontStyle: "italic",
    marginTop: 4,
  },
  cartSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 60,
    marginRight: 10,
  },
  cartButton: {
    flexDirection: "row",
    backgroundColor: "#0a84ff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  cartText: {
    color: "white",
    marginLeft: 6,
    fontWeight: "500",
  },
});
