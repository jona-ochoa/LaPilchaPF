import { useGetProductsByIdQuery } from '../../GlobalRedux/api/productsApi';
import { Product } from "../../GlobalRedux/api/productsApi";
import Detail from '../../components/Detail';

const ProductDetailPage = ({ id }) => {

  const { data, error, isLoading, isFetching } = useGetProductsByIdQuery(id);

  if (isLoading || isFetching) return <p>Loading...</p>;
  if (error) return <p>Error fetching products</p>;

  const product = data as Product;

  return (
    <Detail
      id={product.id}
      title={product.title}
      price={product.price}
      image={product.image}
      description={product.description}
      rating={product.rating}
      category={product.category}
    />
  );
};

export default ProductDetailPage;
  
