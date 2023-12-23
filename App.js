import { Provider } from "react-redux";
import Navigation from "./navigation";
import { store } from "./context/store";
import { StripeProvider } from "@stripe/stripe-react-native";
import { YOUR_STRIPE_PUBLISHABLE_KEY } from "./baseData";

export default function App() {
  return (
    <StripeProvider publishableKey={"pk_test_51OQDjkSCDwAF0onJHxwU09RKdcXZBSZTffaHqRNCjJwUUEhQzbyNe3NeobJi1dxOj6q1WTnlpTFxYdG4eoOrBZVY00OuBTuFOU"}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </StripeProvider>
  );
}
