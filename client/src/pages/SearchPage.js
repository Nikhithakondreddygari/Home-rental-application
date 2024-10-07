import { useParams } from "react-router-dom";
import "../styles/List.css";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useParams();
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();

  const getSearchListings = async () => {
    try {
      const response = await fetch(`http://localhost:3030/properties/search/${search}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }

      const data = await response.json();
      dispatch(setListings({ listings: data }));
    } catch (err) {
      console.log("Fetch Search List failed!", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchListings();
  }, [search]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">{search}</h1>
      <div className="list">
        {listings?.map((listing) => (
          <ListingCard key={listing._id} {...listing} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
