import CartItem from "../../types/CartItem";
import { CartReducerState } from "../../types/InitialState";
import categoriesData from "./categoriesData";

const cartData: CartItem[]= [
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

    category: categoriesData[2],
    quantity: 1,
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
    category: categoriesData[0],
    quantity: 20,
  },
];

export default cartData;
