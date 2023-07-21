import React, { useState } from 'react';
import { Product } from '../GlobalRedux/api/productsApi';
import { useDispatch, useSelector } from "react-redux";
import { addToCarrito } from "../GlobalRedux/features/carritoSlice"
import { useLocalStorage } from 'hooks/useLocalstorage';
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings'
import { updateProductRating } from 'GlobalRedux/features/productsSlice';

interface RatingData {
  rate: number,
  count: number,
}

interface DetailProps {
  _id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  rating: RatingData[];
  category: string;
  isDeactivated: boolean;
  averageRating: number,
  ratingCount: number,
}


const Detail: React.FC<DetailProps> = ({
  _id,
  title,
  price,
  image,
  description,
  rating,
  category,
  isDeactivated,
  averageRating,
  ratingCount
}) => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useLocalStorage<Product[]>('cartItems', []);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const [product, setProduct] = useState<DetailProps>({
    _id: '',
    title: '',
    price: '',
    image: '',
    description: '',
    rating: [{ rate: 4.1, count: 122 }],
    category: '',
    isDeactivated: false,
    averageRating: 0,
    ratingCount: 0
  })

  const isProductInCart = cartItems.some((item) => item._id === _id);

  const handleOnClick = () => {
    if (isProductInCart) {
      const updatedCartItems = cartItems.filter((item) => item._id !== _id);
      setCartItems(updatedCartItems);
      toast.error('Producto eliminado del carrito');
    } else {
      const item: Product = {
        _id,
        title,
        price,
        image,
        description,
        rating,
        category,
        isDeactivated
      };
      toast.success('Producto agregado correctamente')
      setCartItems([...cartItems, item]);
      dispatch(addToCarrito(item));
    }
  };

  const calculateAverageRating = (ratingData: RatingData[]): number => {
    if (ratingData.length === 0) return 0;
    const totalRating = ratingData.reduce((acc, curr) => acc + curr.rate, 0);
    return totalRating / ratingData.length;
  }

  const calculateRatingCount = (ratingData: RatingData[]): number => {
    return ratingData.reduce((acc, curr) => acc + curr.count, 0)
  }

  const handleRatingChange = (rating: number) => {
    if (hasVoted) {
      toast.error("Ya has votado este producto.");
      return;
    }
    const updatedRating: RatingData[] = [
      ...product.rating,
      { rate: rating, count: 1 }
    ];
    const updatedProduct: DetailProps = {
      ...product,
      rating: updatedRating,
      averageRating: calculateAverageRating(updatedRating),
      ratingCount: calculateRatingCount(updatedRating)
    }

    setProduct(updatedProduct)
    setSelectedRating(rating);
    setHasVoted(true);

    dispatch(updateProductRating({ productId: _id, newRating: rating }))
    toast.success("Gracias por tu calificación!")
  }



  return (

    <section className="text-gray-700 body-font overflow-hidden bg-white" key={_id}>
      <div className="container px-5 py-24 mx-auto">
        <div>
          <a href='/products'>
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center text-center gap-x-2 mr-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
              </svg>
              Volver al catálogo</button>
          </a>
        </div>

        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={image} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{category}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{title}</h1>
            <div className="flex mb-4">
              <span className="flex items-center">

                <StarRatings rating={selectedRating || product.averageRating}
                  starRatedColor="gold" starEmptyColor="gray" starHoverColor="gold"
                  changeRating={handleRatingChange} numberOfStars={5}
                  name="rating" starDimension="20px" starSpacing="2px" />

                <span className="text-gray-600 ml-3">Rating:{product.averageRating.toFixed(1)} Votes Submitted: {product.ratingCount}</span>
              </span>

            </div>
            <p className="leading-relaxed">{description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                    <option>SM</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>      
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">${price}</span>
              {isDeactivated ? (<span className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">DESACTIVADO</span>) : (<button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={handleOnClick}>
                {isProductInCart ? 'ELIMINAR DEL CARRITO' : 'AGREGAR AL CARRITO'}
              </button>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Detail