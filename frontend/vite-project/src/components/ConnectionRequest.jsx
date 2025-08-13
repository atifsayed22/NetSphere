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
    <div className="p-4 border rounded-lg shadow-sm flex items-center gap-4">
      <img
        src={request.requester?.profileImage || "/default-avatar.png"}
        alt={request.requester?.name || "User"}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <p className="font-medium">{request.requester?.name || "Unknown User"}</p>
        <p className="text-sm text-gray-500">{request.requester?.location || request.requester?.email || "No details available"}</p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => handleAction("accepted")}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Accept
          </button>
          <button
            onClick={() => handleAction("rejected")}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionRequest;
