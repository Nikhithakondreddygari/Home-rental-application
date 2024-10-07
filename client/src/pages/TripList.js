import { useEffect, useState } from "react";
import "../styles/List.css";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);
  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(`http://localhost:3030/users/${userId}/trips`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error('Failed to fetch trip list');
      }

      const data = await response.json();
      dispatch(setTripList(data));
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTripList();
  }, [userId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList?.map(({ listingId, hostId, startDate, endDate, totalPrice }) => (
          <ListingCard
            key={listingId._id} // Added unique key prop
            listingId={listingId._id}
            creator={hostId._id}
            listingPhotoPaths={listingId.listingPhotoPaths}
            city={listingId.city}
            province={listingId.province}
            country={listingId.country}
            category={listingId.category}
            startDate={startDate}
            endDate={endDate}
            totalPrice={totalPrice}
            booking={true}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TripList;
