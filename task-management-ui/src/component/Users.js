import React, { useState, useEffect } from "react";
import axios from "axios";
import MainHeader from "./MainHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./styles.css"; // Import custom CSS for additional styling

function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editedEmail, setEditedEmail] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedUserImage, setEditedUserImage] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFileChange = (e) => {
    setUserImage(e.target.files[0]);
  };

  const handleEditedFileChange = (e) => {
    setEditedUserImage(e.target.files[0]);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5075/api/Users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  const handleAddUser = async () => {
    const formData = new FormData();
    formData.append("UserId", 0);
    formData.append("Name", name);
    formData.append("Email", email);
    formData.append("ImageUrl", "");
    if (userImage) {
      formData.append("UserImage", userImage);
    }

    try {
      await axios.post("http://localhost:5075/api/Users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchUsers();
      setEmail("");
      setName("");
      toast.success("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5075/api/Users/${userId}`);
      setUsers(users.filter((user) => user.userId !== userId));
      setShowDeleteModal(false);
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = async () => {
    const formData = new FormData();
    formData.append("UserId", selectedUserId);
    formData.append("Name", editedName);
    formData.append("Email", editedEmail);
    formData.append("ImageUrl", "");
    if (editedUserImage) {
      formData.append("UserImage", editedUserImage);
    }

    try {
      await axios.put(`http://localhost:5075/api/Users/${selectedUserId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchUsers();
      setShowEditModal(false);
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  return (
    <>
      <MainHeader />
      <div className="container mt-4">
        <h2>User Management</h2>
        <div className="mb-4">
          <div className="container-fluid bg-dark p-4 rounded">
            <div className="row g-3 align-items-center text-light">
              <div className="col-md-4">
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                />
              </div>
              <div className="col-md-4">
                <input
                  type="file"
                  className="form-control"
                  id="userImage"
                  name="userImage"
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" onClick={handleAddUser}>
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {users.map((user) => (
            <div className="col" key={user.userId}>
              <div
                className="card h-100"
                style={{
                  transition: "transform 0.3s",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={user.imageUrl || "placeholder.png"}
                  className="card-img-top"
                  alt="Profile"
                />
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">{user.email}</p>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => {
                        setEditedEmail(user.email);
                        setEditedName(user.name);
                        setSelectedUserId(user.userId);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setSelectedUserId(user.userId);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteUser(selectedUserId)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="email"
            className="form-control mb-3"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            placeholder="Enter new email"
          />
          <input
            type="text"
            className="form-control mb-3"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Enter new name"
          />
          <input
            type="file"
            className="form-control"
            id="editedUserImage"
            name="editedUserImage"
            onChange={handleEditedFileChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default Users;
