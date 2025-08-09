// controllers/connectionController.js
import Connection from "../models/Connection.js";

// Send a connection request
export const sendConnectionRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;
    const requesterId = req.user.id;
    console.log(recipientId)
    console.log(requesterId)

    // Check if already exists
    const existing = await Connection.findOne({
      requester: requesterId,
      recipient: recipientId
    });

    if (existing) {
      return res.status(400).json({ message: "Connection already exists" });
    }

    const connection = await Connection.create({
      requester: requesterId,
      recipient: recipientId
    });
    console.log(connection)

    res.status(201).json(connection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept connection request
export const acceptConnectionRequest = async (req, res) => {
  try {
    const { connectionId } = req.params;
    const connection = await Connection.findByIdAndUpdate(
      connectionId,
      { status: "accepted" },
      { new: true }
    );
    res.json(connection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject connection request
export const rejectConnectionRequest = async (req, res) => {
  try {
    const { connectionId } = req.params;
    const connection = await Connection.findByIdAndUpdate(
      connectionId,
      { status: "rejected" },
      { new: true }
    );
    res.json(connection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all pending requests for the logged-in user
export const getPendingRequests = async (req, res) => {
  try {
    const requests = await Connection.find({
      recipient: req.user.id,
      status: "pending"
    }).populate("requester", "name email  location about skills")
    ;
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all accepted connections for the logged-in user
export const getConnections = async (req, res) => {
  try {
    const userId = req.user.id;
    const connections = await Connection.find({
      $or: [
        { requester: userId, status: "accepted" },
        { recipient: userId, status: "accepted" }
      ]
    }).populate("requester recipient", "name email profilePic");
    console.log(connections)
    res.json(connections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Deletet send request 

export const deleteRequest = async (req, res) => {
  try {
    const requesterId = req.user.id;
    const recipientId = req.params.recipientId; // Assuming recipient ID is passed as param

    // Find the pending connection request where current user is requester and recipient is recipientId
    const connection = await Connection.findOne({
      requester: requesterId,
      recipient: recipientId,
      status: "pending",
    });

    if (!connection) {
      return res.status(404).json({ message: "No pending request found to cancel." });
    }

    // Delete the connection request
    await connection.deleteOne();

    res.json({ message: "Connection request cancelled successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Check if a connection exists between logged-in user and recipient
export const existingConnection = async (req, res) => {
  try {
    const requesterId = req.user.id;
    const recipientId = req.params.recipientId;

    if (!recipientId) {
      return res.status(400).json({ message: "Recipient ID is required" });
    }

    // Find connection where either user is requester or recipient and status is pending or accepted
    const connection = await Connection.findOne({
      $or: [
        { requester: requesterId, recipient: recipientId },
        { requester: recipientId, recipient: requesterId },
      ],
      status: { $in: ["pending", "accepted"] },
    });

    let connectionStatus = "none";

    if (connection) {
      connectionStatus = connection.status;
    }

    res.json({ connectionStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
