import User from "../../types/User";

const usersData: User[] = [
  {
    _id: 1,
    email: "john@mail.com",
    password: "changeme",
    name: "Jhon",
    role: "customer",
    avatar: "https://i.imgur.com/kTPCFG2.jpeg",
  },
  {
    _id: 2,
    email: "maria@mail.com",
    password: "12345",
    name: "Maria",
    role: "customer",
    avatar: "https://i.imgur.com/aCDF0yh.jpeg",
  },
  {
    _id: 3,
    email: "admin@mail.com",
    password: "admin123",
    name: "Admin",
    role: "admin",
    avatar: "https://i.imgur.com/RLnJJyQ.jpeg",
  },
]

export default usersData