import "../styles/List.css";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList?.map((listing) => (
          <ListingCard key={listing._id} {...listing} /> // Added unique key prop
        ))}
      </div>
      <Footer />
    </>
  );
};

export default WishList;
