import { useEffect, useState } from "react";

import {
  createProductAsync,
  fetchAllProductsAsync,
  sortByPrice,
} from "../redux/reducers/productsReducer";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import getFilteredProducts from "../redux/selectors/getFilteredProducts";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const { products, loading, error } = useAppSelector(
    (state) => state.productsReducer
  );
  const dispatch = useAppDispatch();
  const [sortDirection, setSortDirection] = useState("asc");
  const [search, setSearch] = useState<string | undefined>();
  const filteredProducts = useAppSelector((state) =>
    getFilteredProducts(state, search)
  );
  const navigate = useNavigate();
  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    dispatch(fetchAllProductsAsync({ offset: 0, limit: 300 }));
  }, []);

  const onSortToggle = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    dispatch(sortByPrice(newSortDirection));
  };

  const newProduct = {
    title: "MacBook Air",
    price: 999,
    description: "Thin laptop by Apple",
    categoryId: 19,
    images: ["https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"],
  };
  const onAddProduct = () => {
    dispatch(createProductAsync(newProduct))
  }

  return (
    <div>
      <button onClick={onAddProduct}>Add Product</button>
      <button onClick={onSortToggle}>
        Sort by Price:{" "}
        {sortDirection === "desc" ? "Low to High" : "High to Low"}
      </button>
      <input
        type="text"
        placeholder="Search Products by Title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredProducts?.map((p) => (
        <div>
          <div key={p.id} onClick={() => handleProductClick(p.id)}>
            {p.id} {p.title} {p.price}
          </div>
          <button>Update product</button>
          <button>Delete product</button>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
