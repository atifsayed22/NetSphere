import React from "react";
import axios from "axios";
import BASE_URL from "../config";

const ConnectionRequest = ({ request, setConnectionRequests, setConnections }) => {
  const handleAction = async (action) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${BASE_URL}/api/connections/accept/${request._id}`,
        { status: action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (action === "accepted") {
        setConnections((prev) => [
          ...prev,
          {
            ...request,
            status: "accepted", // update status to accepted
          },
        ]);
      }
      setConnectionRequests((prev) => prev.filter((r) => r._id !== request._id));
    } catch (error) {
      console.error(`Error updating connection request:`, error);
    }
  };

  return (
    <div className="request-card">
      <img
        src={request.requester?.profileImage || "/default-avatar.png"}
        alt={request.requester?.name || "User"}
        className="request-avatar"
      />
      <div className="request-info">
        <p className="request-name">{request.requester?.name || "Unknown User"}</p>
        <p className="request-details">{request.requester?.location || request.requester?.email || "No details available"}</p>
        <div className="request-actions">
          <button
            onClick={() => handleAction("accepted")}
            className="accept-btn"
          >
            Accept
          </button>
          <button
            onClick={() => handleAction("rejected")}
            className="reject-btn"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionRequest;
