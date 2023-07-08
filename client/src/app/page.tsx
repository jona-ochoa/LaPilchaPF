import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import ProductsPage from "./products/page"
import { useAppDispatch, useAppSelector } from "../GlobalRedux/hooks";






export default function HomePage() {



  return (
<div> 

    <Navbar/>
    <ProductsPage/>
    <Footer/>

</div>
  )
}
