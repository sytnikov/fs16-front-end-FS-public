import { useEffect } from "react";

import { fetchAllProductsAsync } from "../redux/reducers/productsReducer";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";

const ProductsPage = () => {
  const products = useAppSelector((state) => state.productsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);

  return (
    <div>
      Product list
      {products && products.map((p) => <div key={p.id}>{p.title}</div>)}
    </div>
  );
};

export default ProductsPage;
