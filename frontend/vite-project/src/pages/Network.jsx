import React, { useState, useEffect } from "react";
import axios from "axios";
import ConnectionRequest from "../components/ConnectionRequest";
import { Link } from "react-router-dom";

const Network = () => {
  const [connections, setConnections] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId"); // or get from token decode if you do JWT

  // Fetch connections and requests from backend
  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [pendingRes, connectionsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/connections/pending", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/api/connections", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setConnectionRequests(pendingRes.data || []);
        setConnections(connectionsRes.data || []);
      } catch (error) {
        console.error("Error fetching network data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkData();
  }, []);
  function getInitials(name) {
    if (!name) return "";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[1][0]).toUpperCase();
  }
  if (loading)
    return <p className="text-center mt-10">Loading network data...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">My Network</h1>

      {/* Connection Requests */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Connection Requests</h2>
        {connectionRequests.length === 0 ? (
          <p className="text-gray-500">No pending requests</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {connectionRequests.map((req) => (
              <ConnectionRequest
                key={req._id}
                request={req}
                setConnectionRequests={setConnectionRequests}
                setConnections={setConnections}
              />
            ))}
          </div>
        )}
      </section>

      {/* Connections List */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Connections</h2>
        {connections.length === 0 ? (
          <p className="text-gray-500">You don't have any connections yet</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {connections.map((conn) => {
              const otherUser =
                conn.requester._id === userId ? conn.recipient : conn.requester;

              return (
                <Link
                  to={`/user/${otherUser._id}`}
                  key={conn._id}
                  className="p-4 border rounded-lg flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
                >
                  {otherUser.profilePicture ? (
                    <img
                      src={otherUser.profilePicture}
                      alt={otherUser.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold text-lg">
                      {getInitials(otherUser.name)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {otherUser.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {otherUser.email || "No profession"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Network;
