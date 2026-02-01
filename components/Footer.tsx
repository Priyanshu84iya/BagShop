"use client";

import { useCurrency } from "@/lib/CurrencyContext";

export default function Footer() {
  const { formatPrice } = useCurrency();

  return (
    <footer className="border-t-4 border-black bg-black text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-brutal text-2xl mb-4 text-brutal-yellow">PRYVENTO</h3>
            <p className="font-mono">
              MADE IN INDIA. BRUTAL BAGS FOR BRUTAL PEOPLE.
              <br />
              NO COMPROMISE. NO APOLOGIES.
            </p>
          </div>

          <div>
            <h4 className="font-brutal text-xl mb-4 text-brutal-cyan">QUICK LINKS</h4>
            <ul className="font-mono space-y-2">
              <li>
                <a href="/" className="hover:text-brutal-yellow transition-colors">
                  → HOME
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-brutal-yellow transition-colors">
                  → PRODUCTS
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-brutal-yellow transition-colors">
                  → ABOUT
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-brutal-yellow transition-colors">
                  → CONTACT
                </a>
              </li>
              <li>
                <a href="/tracking" className="hover:text-brutal-yellow transition-colors">
                  → TRACK ORDER
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-brutal text-xl mb-4 text-brutal-pink">INFO</h4>
            <ul className="font-mono space-y-2">
              <li>FREE SHIPPING ON ORDERS OVER {formatPrice(8000)}</li>
              <li>30-DAY RETURN POLICY</li>
              <li>LIFETIME WARRANTY</li>
              <li>MADE IN INDIA</li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-white mt-8 pt-8">
          <div className="mb-6">
            <h4 className="font-brutal text-xl mb-4 text-center text-brutal-yellow">WE ACCEPT</h4>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="border-4 border-white bg-white text-black px-4 py-2 font-brutal text-sm flex items-center gap-2">
                <span className="text-lg">📱</span>
                UPI
              </div>
              <div className="border-4 border-white bg-white text-black px-4 py-2 font-brutal text-sm flex items-center gap-2">
                <span className="text-lg">💳</span>
                VISA
              </div>
              <div className="border-4 border-white bg-white text-black px-4 py-2 font-brutal text-sm flex items-center gap-2">
                <span className="text-lg">💳</span>
                MASTERCARD
              </div>
              <div className="border-4 border-white bg-white text-black px-4 py-2 font-brutal text-sm flex items-center gap-2">
                <span className="text-lg">💳</span>
                RUPAY
              </div>
              <div className="border-4 border-white bg-white text-black px-4 py-2 font-brutal text-sm flex items-center gap-2">
                <span className="text-lg">🏦</span>
                NET BANKING
              </div>
              <div className="border-4 border-white bg-white text-black px-4 py-2 font-brutal text-sm flex items-center gap-2">
                <span className="text-lg">👛</span>
                WALLETS
              </div>
              <div className="border-4 border-white bg-white text-black px-4 py-2 font-brutal text-sm flex items-center gap-2">
                <span className="text-lg">📊</span>
                EMI
              </div>
              <div className="border-4 border-white bg-white text-black px-4 py-2 font-brutal text-sm flex items-center gap-2">
                <span className="text-lg">💵</span>
                COD
              </div>
            </div>
          </div>

          <div className="space-y-2 text-center font-mono text-sm">
            <p>&copy; 2026 PRYVENTO. ALL RIGHTS BRUTALLY RESERVED.</p>
            <p>
              DEVELOPED BY{" "}
              <a
                href="https://github.com/Priyanshu84iya"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brutal-yellow transition-colors"
              >
                PRIYANSHU
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
