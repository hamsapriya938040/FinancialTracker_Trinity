import { Slot } from "expo-router";
import ProductProvider from "../context/ProductContext";
import LoanProvider from "../context/LoanContext";

export default function RootLayout() {
  return (
    <ProductProvider>
      <LoanProvider>
        <Slot />
      </LoanProvider>
    </ProductProvider>
  );
}

