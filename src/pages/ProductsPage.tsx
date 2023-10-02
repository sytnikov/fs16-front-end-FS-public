import { useEffect } from "react";

import { fetchAllProductsAsync } from "../redux/reducers/productsReducer";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";

const ProductsPage = () => {
  const {products, loading, error} = useAppSelector((state) => state.productsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync({ offset: 0, limit: 300 }));
  }, []);

  return (
    <div>
      {loading && (<p>Loading ...</p>)}
      {error && (<p>{error}</p>)}
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
