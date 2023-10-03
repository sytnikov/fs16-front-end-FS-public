import { useEffect, useState } from "react";

import {
  fetchAllProductsAsync,
  sortByPrice,
} from "../redux/reducers/productsReducer";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { AppState } from "../redux/store";

const ProductsPage = () => {
  const { products, loading, error } = useAppSelector(
    (state) => state.productsReducer
  );
  const dispatch = useAppDispatch();
  const [sortDirection, setSortDirection] = useState("desc");
  const [search, setSearch] = useState<string | undefined>();

  const getFilteredProducts = (state: AppState, search: string | undefined) => {
    return state.productsReducer.products.filter((p) =>
      p.title.toLowerCase().includes(search?.toLowerCase() || "")
    );
  };
  const filteredProducts = useAppSelector((state) =>
    getFilteredProducts(state, search)
  );

  useEffect(() => {
    dispatch(fetchAllProductsAsync({ offset: 0, limit: 300 }));
  }, []);

  const onSortToggle = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    dispatch(sortByPrice(newSortDirection));
  };

  return (
    <div>
      <button onClick={onSortToggle}>
        Sort by Price: {sortDirection === "asc" ? "Low to High" : "High to Low"}
      </button>
      <input
        type="text"
        placeholder="Search Products by Title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <p>Loading ...</p>}
      {filteredProducts?.map((p) => (
        <div key={p.id}>
          {p.id} {p.title} {p.price}
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
