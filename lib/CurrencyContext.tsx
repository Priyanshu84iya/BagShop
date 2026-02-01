"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Currency = "INR" | "USD" | "EUR" | "GBP";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInINR: number) => number;
  formatPrice: (priceInINR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Conversion rates (1 INR = x currency)
const conversionRates: Record<Currency, number> = {
  INR: 1,
  USD: 0.012, // 1 INR ≈ 0.012 USD
  EUR: 0.011, // 1 INR ≈ 0.011 EUR
  GBP: 0.0095, // 1 INR ≈ 0.0095 GBP
};

const currencySymbols: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("INR");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCurrency = localStorage.getItem("bagshop-currency") as Currency;
    if (savedCurrency && ["INR", "USD", "EUR", "GBP"].includes(savedCurrency)) {
      setCurrencyState(savedCurrency);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bagshop-currency", currency);
    }
  }, [currency, isLoaded]);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
  };

  const convertPrice = (priceInINR: number): number => {
    return priceInINR * conversionRates[currency];
  };

  const formatPrice = (priceInINR: number): string => {
    const convertedPrice = convertPrice(priceInINR);
    const symbol = currencySymbols[currency];

    if (currency === "INR") {
      return `${symbol}${Math.round(convertedPrice).toLocaleString("en-IN")}`;
    }

    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
