import { Helmet } from "react-helmet-async"
import Banner from "./Banner"
import Footer from "../Footer/Footer"

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Diabetes prediction | Home</title>
      </Helmet>
      <Banner />
      <Footer ></Footer>
      
    </>
  )
}

export default Home
