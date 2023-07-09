import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ProductsPage from "./products/page"
import RootLayout from "./layout"

export default function HomePage() {

  return (
<div> 
  <RootLayout>
    <Navbar />
    <ProductsPage />
    <Footer />
  </RootLayout>
</div>
  )
}
