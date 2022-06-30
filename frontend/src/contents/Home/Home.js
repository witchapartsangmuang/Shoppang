import "./../contents.css"
import "./Home.css"
import Category from "../../components/Category/Category"
import ProductResult from "../../components/ProductResult/ProductResult"
function Home() {
    return (
        <div className="content">
            <div className="insidecontent">
                <Category />
            </div>
            <div className="insidecontent">
                <ProductResult />
            </div>
        </div>
    )
}
export default Home