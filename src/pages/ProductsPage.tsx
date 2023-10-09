import { useEffect, useState } from "react";

import {
  createProductAsync,
  deleteProductAsync,
  fetchAllProductsAsync,
  sortByPrice,
  updateProductAsync,
} from "../redux/reducers/productsReducer";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import getFilteredProducts from "../redux/selectors/getFilteredProducts";
import { useNavigate } from "react-router-dom";
import Product from "../types/Product";
import { addToCart } from "../redux/reducers/cartReducer";
import { fetchAllCategoriesAsync } from "../redux/reducers/categoriesReducer";
import { AppState } from "../redux/store";

const ProductsPage = () => {
  const { products, loading, error } = useAppSelector(
    (state) => state.productsReducer
  );
  const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  );
  const dispatch = useAppDispatch();
  const [sortDirection, setSortDirection] = useState("asc");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const filteredProducts = useAppSelector((state) =>
    getFilteredProducts(state, search, category)
  );

  // const filteredProducts = products.filter((p) => {
  //   const matchesCategory = !category || p.category.id === Number(category);
  //   const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
  //   return matchesCategory && matchesSearch;
  // });

  const navigate = useNavigate();

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    dispatch(fetchAllProductsAsync({ offset: 0, limit: 300 }));
    dispatch(fetchAllCategoriesAsync());
  }, []);

  const onSortToggle = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    dispatch(sortByPrice(newSortDirection));
  };

  // creating a mock product
  const onAddProduct = () => {
    const newProduct = {
      title: "MacBook Air",
      price: 999,
      description: "Thin laptop by Apple",
      categoryId: 15,
      images: [
        "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
      ],
    };
    dispatch(createProductAsync(newProduct));
  };

  // updating a mock product
  const onUpdateProduct = (id: number) => {
    const updatedProduct = {
      update: {
        title: "MacBook Pro",
        price: 1999,
      },
      id: id,
    };
    dispatch(updateProductAsync(updatedProduct));
  };

  // deleting a mock product
  const onDeleteProduct = (id: number) => {
    dispatch(deleteProductAsync(id));
  };

  const onAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      {currentUser && currentUser.role === "admin" && (
        <div>
          <button onClick={onAddProduct}>Add Product</button>
        </div>
      )}
      <button onClick={onSortToggle}>
        Sort by Price:{" "}
        {sortDirection === "desc" ? "Low to High" : "High to Low"}
      </button>
      <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        Product categories:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Filter by category</option>{" "}
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {filteredProducts?.map((p) => (
        <div>
          <div key={p.id} onClick={() => handleProductClick(p.id)}>
            {p.id} {p.title} {p.category.name} {p.price}
            {currentUser && currentUser.role === "admin" && (
              <div>
                <button onClick={() => onUpdateProduct(p.id)}>
                  Update product
                </button>
                <button onClick={() => onDeleteProduct(p.id)}>
                  Delete product
                </button>
              </div>
            )}
          </div>
          <button onClick={() => onAddToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
