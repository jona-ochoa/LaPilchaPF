  /* import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../redux';
import { fetchProductById } from '../../redux/products/productSlice';
import ProductDetail from '../../components/ProductDetail';
 

  const ProductDetailPage = () => {
   
  const router = useRouter();
  const { id } = router.query;
  

  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.products.productsById[id]);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <ProductDetail
      id={product.id}
      name={product.name}
      price={product.price}
      
    />
  );
};

export default ProductDetailPage;   */
