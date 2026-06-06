import "./styles/App.scss";
import { Routes, Route } from "react-router";

//pages
import Home from "./pages/Home/Home";
import Restaurants from "./pages/Restaurants/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails/RestaurantDetails";
import Cart from "./pages/Cart/Cart";
import Search from "./pages/Search/Search";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/restaurants" element={<Restaurants />} />
			<Route path="/restaurants/:restaurantId" element={<RestaurantDetails />} />
			<Route path="/search" element={<Search />} />
			<Route path="/cart" element={<Cart />} />
			<Route path="*" element={<h1>404 - Page Not Found</h1>} />
		</Routes>
	);
}
