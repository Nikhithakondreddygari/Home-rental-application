import "../styles/CreateListing.css";
import Navbar from "../components/Navbar";
import { categories, types, facilities } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  /* BASIC COUNTS */
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  /* AMENITIES */
  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const creatorId = useSelector((state) => state.user._id);
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);

      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });

      const response = await fetch("http://localhost:3030/properties/create", {
        method: "POST",
        body: listingForm,
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-listing">
        <h1>Publish Your Place</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${category === item.label ? "selected" : ""}`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Where's your place located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Apartment, Suite, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apt, Suite, etc. (if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <h3>How many guests can your place accommodate?</h3>
            <div className="half">
              <div className="count">
                <p>Guests</p>
                <button
                  type="button"
                  onClick={() => setGuestCount(Math.max(guestCount - 1, 1))}
                >
                  -
                </button>
                <span>{guestCount}</span>
                <button
                  type="button"
                  onClick={() => setGuestCount(guestCount + 1)}
                >
                  +
                </button>
              </div>
              <div className="count">
                <p>Bedrooms</p>
                <button
                  type="button"
                  onClick={() => setBedroomCount(Math.max(bedroomCount - 1, 1))}
                >
                  -
                </button>
                <span>{bedroomCount}</span>
                <button
                  type="button"
                  onClick={() => setBedroomCount(bedroomCount + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="half">
              <div className="count">
                <p>Beds</p>
                <button type="button" onClick={() => setBedCount(Math.max(bedCount - 1, 1))}>
                  -
                </button>
                <span>{bedCount}</span>
                <button type="button" onClick={() => setBedCount(bedCount + 1)}>
                  +
                </button>
              </div>
              <div className="count">
                <p>Bathrooms</p>
                <button type="button" onClick={() => setBathroomCount(Math.max(bathroomCount - 1, 1))}>
                  -
                </button>
                <span>{bathroomCount}</span>
                <button type="button" onClick={() => setBathroomCount(bathroomCount + 1)}>
                  +
                </button>
              </div>
            </div>

            <h3>Which amenities do you offer?</h3>
            <div className="amenities-list">
              {facilities?.map((facility, index) => (
                <div
                  key={index}
                  className={`amenity ${amenities.includes(facility) ? "selected" : ""}`}
                  onClick={() => handleSelectAmenities(facility)}
                >
                  {facility}
                </div>
              ))}
            </div>
          </div>

          <div className="create-listing_step2">
            <h2>Step 2: Add photos</h2>
            <hr />
            <div className="upload-container">
              <label htmlFor="file-upload" className="upload-label">
                <IoIosImages className="upload-icon" />
                <p>Upload Photos</p>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleUploadPhotos}
                style={{ display: "none" }}
              />
            </div>

            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos">
                {(provided) => (
                  <div
                    className="photo-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.map((photo, index) => (
                      <Draggable key={index} draggableId={index.toString()} index={index}>
                        {(provided) => (
                          <div
                            className="photo-item"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <img src={URL.createObjectURL(photo)} alt="Uploaded" />
                            <div className="photo-actions">
                              <RemoveCircleOutline onClick={() => handleRemovePhoto(index)} />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <div className="create-listing_step3">
            <h2>Step 3: Describe your listing</h2>
            <hr />
            <label>
              <p>Title</p>
              <input
                type="text"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
            </label>
            <label>
              <p>Description</p>
              <textarea
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />
            </label>
            <label>
              <p>Highlight</p>
              <input
                type="text"
                name="highlight"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
                required
              />
            </label>
            <label>
              <p>Highlight Description</p>
              <input
                type="text"
                name="highlightDesc"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                required
              />
            </label>
            <label>
              <p>Price</p>
              <input
                type="number"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                required
              />
            </label>
          </div>

          <button type="submit" className="submit-button">Publish Listing</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateListing;
