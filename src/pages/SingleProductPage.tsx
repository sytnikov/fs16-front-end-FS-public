import { useParams } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";

const SingleProductPage = () => {
  const params = useParams();
  const productId = Number(params.productId);

  const product = useAppSelector((state) =>
    state.productsReducer.products.find((p) => p.id === productId)
  );

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
