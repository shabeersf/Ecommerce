import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import { usePaymentSheet, useStripe,CardField,useConfirmPayment } from "@stripe/stripe-react-native";
import axios from "axios";
import { AUTH_PASSWORD, AUTH_USER } from "../baseData";
import { encode as base64Encode } from "base-64";

const PaymentScreen = () => {
  const stripe = useStripe();
  const { presentPaymentSheet } = usePaymentSheet();
  const { confirmPayment } = useConfirmPayment(); // Initialize confirmPayment

  const [clientSecret, setClientSecret] = useState(null);
  const [isCardFocused, setIsCardFocused] = useState(false);

  useEffect(() => {
    const encodedCredentials = base64Encode(`${AUTH_USER}:${AUTH_PASSWORD}`);

    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(
          "http://192.168.1.4/zen/ecommerce-native/api/get-stripe.php",
          { baged: "hello" },
          {
            headers: {
              Authorization: `Basic ${encodedCredentials}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const data = response.data.data;
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        // Handle error appropriately, e.g., display an error message to the user
      }
    };

    fetchClientSecret();
  }, []);

  const handleCardFocusChange = (focused) => {
    setIsCardFocused(focused);

    if (!focused && clientSecret) {
      // Present Payment Sheet when card field loses focus
      presentPayment();
    }
  };

  const presentPayment = async () => {
    try {
      const paymentMethod = await stripe?.presentPaymentMethodCreate();
      if (paymentMethod?.error) {
        console.error("Error creating payment method:", paymentMethod.error);
        // Handle error creating payment method
        return;
      }
  
      // Confirm PaymentIntent with the attached payment method
      await stripe?.confirmPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        paymentMethodId: paymentMethod?.paymentMethodId,
      });
    } catch (error) {
      console.error("Error presenting PaymentSheet:", error);
      // Handle error presenting PaymentSheet
    }
  };
  

  const handlePayButtonPress = async () => {
    if (clientSecret) {
      try {
        const { paymentIntent, error } = await confirmPayment(clientSecret); // Use confirmPayment
        if (error) {
          console.error("Error confirming PaymentSheet:", error);
          // Handle error appropriately
        } else {
          console.log("Payment successful:", paymentIntent);
          // Payment successful, proceed with further actions if needed
        }
      } catch (error) {
        console.error("Error confirming PaymentSheet:", error);
        // Handle error appropriately
      }
    } else {
      Alert.alert("Client secret not available");
    }
  };

  return (
    <View style={styles.container}>
      <CardField
      postalCodeEnabled={true}
      placeholders={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        // console.log('cardDetails', cardDetails);
      }}
      onFocus={(focusedField) => {
        // console.log('focusField', focusedField);
      }}
      
    />
      <Button
        title="Pay"
        onPress={handlePayButtonPress}
        disabled={!clientSecret || isCardFocused} // Disable when card is focused
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default PaymentScreen;
