import Product from "../../types/Product";
import categoriesData from "./categoriesData";

const productsData: Product[] = [
  {
    _id: "1",
    name: "Handcrafted Bronze Gloves",
    price: 359,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    images: [
      "https://i.imgur.com/DumuKkD.jpeg",
      "https://i.imgur.com/imQx3Az.jpeg",
      "https://i.imgur.com/aCDF0yh.jpeg",
    ],

    categoryId: categoriesData[2]._id,
    stock: 10,
  },
  {
    _id: "2",
    name: "Generic Concrete Tuna",
    price: 140,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    images: [
      "https://i.imgur.com/s8WRA2O.jpeg",
      "https://i.imgur.com/5iNAL9T.jpeg",
      "https://i.imgur.com/OARGZQW.jpeg",
    ],
    categoryId: categoriesData[0]._id,
    stock: 5
  },
  {
    _id: "3",
    name: "Handcrafted Wooden Gloves",
    price: 844,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    images: [
      "https://i.imgur.com/Dm2pPfd.jpeg",
      "https://i.imgur.com/Y5gHJMd.jpeg",
      "https://i.imgur.com/aCDF0yh.jpeg",
    ],

    categoryId: categoriesData[1]._id,
    stock: 19
  },
];

export default productsData