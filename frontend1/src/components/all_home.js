import axios from "axios";
import { useEffect, useState } from "react";

const AllHomes = (props) => {
  const [home, setHome] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [error, setError] = useState(null);



  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setApiData(null);
    setSelectedValues({});
  };

  
  // Handle checkbox change
  const handleCheckboxChange = (e, userId) => {
    const { checked } = e.target;
    setSelectedValues({
      ...selectedValues,
      [userId]: checked,
    });
  };


  const handleSubmit = async (homeId) => {

    const changedValues = Object.keys(selectedValues).filter((userId) => {
      return selectedValues[userId] !== initialValues[userId];
    });


    const updatePayload = changedValues.map((userId) => ({
      home_id: homeId,
      user_id: parseInt(userId),
      assign_status: selectedValues[userId], 
    }));

    if (updatePayload.length === 0) {
      console.log("No changes detected, skipping update.");
      handleCloseModal();
      return;
    }


    try {
      const response = await axios.put(`/api/user/update-by-home/${homeId}`, {
        updatePayload: updatePayload, 
      });

      setApiData(response.data);
      handleCloseModal(); 
    } catch (error) {
      console.error("Error updating users:", error);
    }
  };


  // Function to open modal and make API call
  const handleOpenModal = async (homeId) => {
    try {
      setShowModal(true);
      setLoading(true);
      const response = await fetch(`/api/home/get-homeDetailsByHomeId/${homeId}`);
      const data = await response.json();
      setApiData(data.data);

      const initialCheckboxValues = {};
      data.data.allUserList.forEach((user) => {
        initialCheckboxValues[user.user_id] = user.assign_status; 
      });
      setInitialValues(initialCheckboxValues);
      setSelectedValues(initialCheckboxValues);

    } catch (error) {
      setError("Error fetching home details");
    } finally {
      setLoading(false);
    }
  };


  // Fetch homes data by userId when props.data changes
  const userData = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setHome(data.data);
      setError(null); 
    } catch (err) {
      setError("Failed to fetch home data");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (props.data) {
      const url = `/api/home/get-allHomeByUserId/${props.data}`;
      userData(url);
    } else {
      setError("User ID not provided");
      setLoading(false); 
    }
  }, [props.data]);

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <>
      <div className="row">
        {home?.map((item) => (
          <div className="col-sm-3" key={item.home.home_id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <strong>Street Address:</strong> {item.home.street_address}
                </h5>
                <p className="card-text">
                  <strong>State:</strong> {item.home.state}
                </p>
                <p className="card-text">
                  <strong>Beds:</strong> {item.home.beds}
                </p>
                <p className="card-text">
                  <strong>Baths:</strong> {item.home.baths}
                </p>
                <p className="card-text">
                  <strong>List Price:</strong> {item.home.list_price}
                </p>
                <p className="card-text">
                  <strong>sqft:</strong> {item.home.sqft}
                </p>
                <p className="card-text">
                  <strong>zip:</strong> {item.home.zip}
                </p>
                <p className="card-text">
                  <strong>user_id:</strong> {item.user_id}
                </p>
                <p className="card-text">
                  <strong>home_id:</strong> {item.home.home_id}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleOpenModal(item.home.home_id)}
                >
                  Home Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Street Address: {apiData?.homeDetails?.street_address}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                {loading ? (
                  <p>Loading...</p>
                ) : apiData ? (
                  <div>
                    <h6>Modify Users For:</h6>

                    {/* Checkbox Section */}
                    {apiData.allUserList?.map((singleUser) => (
                      <div className="form-check" key={singleUser.user_id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name={singleUser.user_id}
                          checked={selectedValues[singleUser.user_id] || false}
                          onChange={(e) =>
                            handleCheckboxChange(e, singleUser.user_id)
                          }
                        />
                        <label className="form-check-label">
                          {singleUser?.user.username}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No data loaded.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSubmit(apiData.homeDetails.home_id)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllHomes;
