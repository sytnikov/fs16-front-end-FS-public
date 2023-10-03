import { useParams } from "react-router-dom"
import useAppSelector from "../hooks/useAppSelector"

const SingleProductPage = () => {
  const params = useParams()
  const productId = Number(params.productId)

  const product = useAppSelector((state) => state.productsReducer.products.find(p => p.id === productId))

  return (
    <div>
      {product?.title}
    </div>
  )
}

export default SingleProductPage
