import Product from "../../types/Product";
import categoriesData from "./categoriesData";

const productsData: Product[] = [
  {
    id: 1,
    title: "Handcrafted Bronze Gloves",
    price: 359,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    images: [
      "https://i.imgur.com/DumuKkD.jpeg",
      "https://i.imgur.com/imQx3Az.jpeg",
      "https://i.imgur.com/aCDF0yh.jpeg",
    ],

    category: categoriesData[2]
  },
  {
    id: 2,
    title: "Generic Concrete Tuna",
    price: 140,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    images: [
      "https://i.imgur.com/s8WRA2O.jpeg",
      "https://i.imgur.com/5iNAL9T.jpeg",
      "https://i.imgur.com/OARGZQW.jpeg",
    ],
    category: categoriesData[0]
  },
  {
    id: 3,
    title: "Handcrafted Wooden Gloves",
    price: 844,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    images: [
      "https://i.imgur.com/Dm2pPfd.jpeg",
      "https://i.imgur.com/Y5gHJMd.jpeg",
      "https://i.imgur.com/aCDF0yh.jpeg",
    ],

    category: categoriesData[1]
  },
];

export default productsData