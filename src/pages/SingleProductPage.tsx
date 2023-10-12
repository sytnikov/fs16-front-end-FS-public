import { useParams } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { useEffect } from "react";
import { fetchSingleProductAsync } from "../redux/reducers/productsReducer";

const SingleProductPage = () => {
  const params = useParams();
  const productId = Number(params.productId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
  }, []);

  const product = useAppSelector((state) => state.productsReducer.product);

  return (
    <div>
      {product && (
        <div>
          <p>{product.title}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <p>{product.category.name}</p>
          <img src={product.images[0]} alt="product image" />
        </div>
      )}
    </div>
  );
};

export default SingleProductPage;
