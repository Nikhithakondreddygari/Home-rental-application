import { useEffect, useState } from "react";
import "../styles/List.css";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const reservationList = useSelector((state) => state.user.reservationList);

  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/users/${userId}/reservations`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reservation list");
      }

      const data = await response.json();
      dispatch(setReservationList(data));
    } catch (err) {
      console.log("Fetch reservation list failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservations</h1>
      <div className="list">
        {reservationList?.map((reservation) => (
          <ListingCard key={reservation._id} {...reservation} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
