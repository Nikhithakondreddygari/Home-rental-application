import "../styles/List.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList;

  const dispatch = useDispatch();
  const getPropertyList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/users/${user._id}/properties`,
        { method: "GET" }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const data = await response.json();
      dispatch(setPropertyList(data));
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList?.map((property) => (
          <ListingCard key={property._id} {...property} />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default PropertyList;
