import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "BRUTAL BACKPACK",
    price: 7499,
    description: "A backpack that screams. Heavy-duty canvas with reinforced straps. Carry your chaos in style.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    category: "backpacks",
    stock: 15,
    featured: true,
  },
  {
    id: "2",
    name: "GEOMETRIC TOTE",
    price: 5399,
    description: "Sharp angles. Bold statement. This tote bag doesn't compromise. Pure geometric perfection.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    category: "totes",
    stock: 22,
    featured: true,
  },
  {
    id: "3",
    name: "HARSH MESSENGER",
    price: 6649,
    description: "Messenger bag with attitude. Cross-body strap that means business. No frills, all function.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    category: "messenger",
    stock: 18,
    featured: false,
  },
  {
    id: "4",
    name: "MINIMALIST CLUTCH",
    price: 4149,
    description: "Less is more. Less is brutal. A clutch that holds what matters and nothing else.",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
    category: "clutches",
    stock: 30,
    featured: true,
  },
  {
    id: "5",
    name: "STREET DUFFLE",
    price: 10799,
    description: "Weekend warrior. Gym beast. Street-ready duffle with brutal durability.",
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800&q=80",
    category: "duffle",
    stock: 12,
    featured: false,
  },
  {
    id: "6",
    name: "CYBER SLING",
    price: 4565,
    description: "Future-proof sling bag. One strap. Maximum impact. Minimal weight.",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
    category: "sling",
    stock: 25,
    featured: false,
  },
  {
    id: "7",
    name: "BLOCK SHOULDER BAG",
    price: 7895,
    description: "Shoulder bag with sharp edges. Block construction. Uncompromising design.",
    image: "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=800&q=80",
    category: "shoulder",
    stock: 16,
    featured: true,
  },
  {
    id: "8",
    name: "RAW WEEKENDER",
    price: 12449,
    description: "Weekend trips demand brutal bags. Raw leather. Raw power. Raw style.",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80",
    category: "weekender",
    stock: 8,
    featured: false,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};
