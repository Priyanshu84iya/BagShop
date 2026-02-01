"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { useCurrency, Currency } from "@/lib/CurrencyContext";
import { useAuth } from "@/lib/AuthContext";
import { useEffect, useState, useRef } from "react";

export default function Header() {
  const { getCartCount } = useCart();
  const { currency, setCurrency } = useCurrency();
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCartCount(getCartCount());
    setIsHydrated(true);
  }, [getCartCount]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as Currency);
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };

  return (
    <header className="border-b-4 border-black bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-brutal hover:text-brutal-pink transition-colors">
            PRYVENTO
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="font-mono text-lg hover:text-brutal-pink transition-colors uppercase"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="font-mono text-lg hover:text-brutal-pink transition-colors uppercase"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="font-mono text-lg hover:text-brutal-pink transition-colors uppercase"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="font-mono text-lg hover:text-brutal-pink transition-colors uppercase"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {isHydrated && (
              <select
                value={currency}
                onChange={handleCurrencyChange}
                className="border-4 border-black bg-white px-3 py-2 font-mono text-sm hover:bg-brutal-yellow transition-colors cursor-pointer"
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
              </select>
            )}

            {isHydrated && (
              user ? (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="border-4 border-black bg-brutal-cyan px-4 py-2 font-brutal text-sm hover:bg-brutal-yellow transition-colors flex items-center gap-2"
                  >
                    <span>👤</span>
                    {user.name.toUpperCase()}
                    <span className={`transition-transform ${showProfileMenu ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 border-4 border-black bg-white shadow-brutal-lg min-w-[200px] z-50">
                      <Link
                        href="/my-orders"
                        className="block px-4 py-3 font-mono text-sm hover:bg-brutal-yellow transition-colors border-b-4 border-black"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        📦 MY ORDERS
                      </Link>
                      <Link
                        href="/tracking"
                        className="block px-4 py-3 font-mono text-sm hover:bg-brutal-yellow transition-colors border-b-4 border-black"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        🚚 TRACK ORDER
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 font-mono text-sm hover:bg-brutal-pink hover:text-white transition-colors"
                      >
                        🚪 LOGOUT
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="border-4 border-black bg-white px-4 py-2 font-brutal text-sm hover:bg-brutal-yellow transition-colors"
                >
                  LOGIN
                </Link>
              )
            )}

            <Link
              href="/cart"
              className="relative border-4 border-black bg-brutal-yellow px-6 py-3 font-brutal text-lg hover:bg-brutal-cyan transition-colors"
            >
              CART
              {isHydrated && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brutal-pink border-2 border-black w-8 h-8 flex items-center justify-center font-brutal text-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex flex-wrap gap-4 mt-4">
          <Link href="/" className="font-mono text-sm hover:text-brutal-pink uppercase">
            Home
          </Link>
          <Link href="/products" className="font-mono text-sm hover:text-brutal-pink uppercase">
            Products
          </Link>
          <Link href="/about" className="font-mono text-sm hover:text-brutal-pink uppercase">
            About
          </Link>
          <Link href="/contact" className="font-mono text-sm hover:text-brutal-pink uppercase">
            Contact
          </Link>
          {isHydrated && user && (
            <>
              <Link href="/my-orders" className="font-mono text-sm hover:text-brutal-pink uppercase">
                My Orders
              </Link>
              <Link href="/tracking" className="font-mono text-sm hover:text-brutal-pink uppercase">
                Track
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

