import React, { useContext, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { CartContext } from "../../context/CartContext";

const CartScreen = ({ navigation }) => {
  const { cart, getTotalPrice } = useContext(CartContext);
  const [donate, setDonate] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [useCoins, setUseCoins] = useState(false);
  const [coinBalance, setCoinBalance] = useState(10); // Example coin balance

  const deliveryAddress = {
    address: "123, Kathmandu, Nepal",
    phoneNumber: "9800000000",
  };

  // Ensure getTotalPrice returns a valid number
  const total = getTotalPrice() || 0;
  const finalTotal = donate ? total + 1 : total;
  const discountedTotal = Math.max(0, useCoins ? finalTotal - 10 : finalTotal); // Ensures total is not negative

  const handleDonation = () => {
    Alert.alert(
      "Donate 1 Rs to Feed Nepal",
      "Would you like to donate 1 Rs to the Feed Nepal program?",
      [
        {
          text: "Yes",
          onPress: () => setDonate(true),
        },
        {
          text: "No",
          onPress: () => setDonate(false),
        },
      ]
    );
  };

  const handleCouponChange = (text) => {
    setCoupon(text);
  };

  const handleUseCoins = () => {
    Alert.alert(
      "Use Coins for Discount",
      `You have ${coinBalance} coins. Would you like to use them for a discount?`,
      [
        {
          text: "Yes",
          onPress: () => {
            setUseCoins(true);
            setCoinBalance(0);
          },
        },
        {
          text: "No",
          onPress: () => setUseCoins(false),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Cart</Text>

          {/* Coin Balance */}
          <View style={styles.coinContainer}>
            <Text style={styles.coinText}>Coins: {coinBalance}</Text>
            <TouchableOpacity onPress={handleUseCoins} style={styles.coinButton}>
              <Text style={styles.coinButtonText}>Use Coins</Text>
            </TouchableOpacity>
          </View>

          {/* Cart Items */}
          {cart.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemPrice}>Rs. {item.price}</Text>
            </View>
          ))}

          {/* Donation Prompt */}
          <TouchableOpacity onPress={handleDonation} style={styles.donateButton}>
            <Text style={styles.donateButtonText}>Donate 1 Rs to Feed Nepal</Text>
          </TouchableOpacity>

          {/* Coupon Input */}
          <View style={styles.couponContainer}>
            <TextInput
              style={styles.couponInput}
              placeholder="Apply Coupon or Voucher"
              value={coupon}
              onChangeText={handleCouponChange}
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* Total Price */}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>Rs. {discountedTotal}</Text>
          </View>

          {/* Delivery Details */}
          <View style={styles.deliveryContainer}>
            <Text style={styles.deliveryTitle}>Delivery Address:</Text>
            <Text style={styles.deliveryText}>{deliveryAddress.address}</Text>
            <Text style={styles.deliveryText}>Phone: {deliveryAddress.phoneNumber}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Proceed to Payment Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => navigation.navigate("Payment")}
        >
          <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginVertical: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  coinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center",
  },
  coinText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  coinButton: {
    backgroundColor: "#FF0000",
    padding: 8,
    borderRadius: 5,
  },
  coinButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 18,
    color: "#333",
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  donateButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  donateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  couponContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  couponInput: {
    height: 40,
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: "#FF0000",
  },
  totalLabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF0000",
  },
  deliveryContainer: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    alignItems: "flex-start",
  },
  deliveryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  deliveryText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  paymentButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;
