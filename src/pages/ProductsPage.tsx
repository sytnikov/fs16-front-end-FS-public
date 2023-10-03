import { useEffect, useState } from "react";

import { fetchAllProductsAsync, sortByPrice } from "../redux/reducers/productsReducer";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";

const ProductsPage = () => {
  const {products, loading, error} = useAppSelector((state) => state.productsReducer);
  const dispatch = useAppDispatch();
  const [sortDirection, setSortDirection] = useState("asc")

  useEffect(() => {
    dispatch(fetchAllProductsAsync({ offset: 0, limit: 300 }));
  }, []);

  const onSortToggle = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc"
    setSortDirection(newSortDirection)
    dispatch(sortByPrice(sortDirection))
  }

  return (
    <div>
      <button onClick={onSortToggle}>Sort by Price: {sortDirection === "asc" ? "Low to High" : "High to Low"}</button>
      {loading && (<p>Loading ...</p>)}
      {products &&
        products.map((p) => (
          <div key={p.id}>
            {p.id} {p.title} {p.price} 
          </div>
        ))}
    </div>
  );
};

export default ProductsPage;
