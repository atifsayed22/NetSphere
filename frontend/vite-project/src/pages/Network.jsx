import React, { useState, useEffect } from "react";
import axios from "axios";
import ConnectionRequest from "../components/ConnectionRequest";
import { Link } from "react-router-dom";
import BASE_URL from "../config";

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
          axios.get(`${BASE_URL}/api/connections/pending`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/api/connections`, {
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
    return <p className="loading-center">Loading network data...</p>;

  return (
    <div className="network-container">
      <h1 className="network-title">My Network</h1>

      {/* Connection Requests */}
      <section className="network-section">
        <h2 className="network-section-title">Connection Requests</h2>
        {connectionRequests.length === 0 ? (
          <p className="network-empty">No pending requests</p>
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
        <h2 className="network-section-title">Your Connections</h2>
        {connections.length === 0 ? (
          <p className="network-empty">You don't have any connections yet</p>
        ) : (
          <div className="network-grid">
            {connections.map((conn) => {
              const otherUser =
                conn.requester._id === userId ? conn.recipient : conn.requester;

              return (
                <Link
                  to={`/user/${otherUser._id}`}
                  key={conn._id}
                  className="connection-card"
                >
                  {otherUser.profilePicture ? (
                    <img
                      src={otherUser.profilePicture}
                      alt={otherUser.name}
                      className="connection-avatar"
                    />
                  ) : (
                    <div className="connection-avatar-placeholder">
                      {getInitials(otherUser.name)}
                    </div>
                  )}
                  <div className="connection-info">
                    <p className="connection-name">
                      {otherUser.name}
                    </p>
                    <p className="connection-email">
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
