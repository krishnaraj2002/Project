import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Card, Col } from "react-bootstrap";
import MainHeader from "./MainHeader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const Progress = () => {
  const [progressData, setProgressData] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    id: 0,
    userId: "",
    projectId: "",
    completionOfWork: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchProgressData = async () => {
    const response = await axios.get("http://localhost:5075/api/Progress");
    setProgressData(response.data);
  };

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5075/api/Users");
    setUsers(response.data);
  };

  const fetchProjects = async () => {
    const response = await axios.get("http://localhost:5075/api/Projects");
    setProjects(response.data);
  };

  useEffect(() => {
    fetchProgressData();
    fetchUsers();
    fetchProjects();
  }, []);

  const handleShowModal = (progress = null) => {
    if (progress) {
      setModalData(progress);
      setIsEditing(true);
    } else {
      setModalData({ id: 0, userId: "", projectId: "", completionOfWork: "" });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  const handleSave = async () => {
    if (isEditing) {
      await axios.put(
        `http://localhost:5075/api/Progress/${modalData.id}`,
        modalData
      );
      toast.success('Progress updated successfully');
    } else {
      await axios.post("http://localhost:5075/api/Progress", modalData);
      toast.success('Progress added successfully');
    }
    fetchProgressData();
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await axios.delete(`http://localhost:5075/api/Progress/${id}`);
      fetchProgressData();
      toast.success('Progress deleted successfully');
    }
  };

  return (
    <>
      <MainHeader />
      <div className="container mt-5">
        <Button variant="primary" onClick={() => handleShowModal()}>
          Add Progress
        </Button>
        <div className="row mt-3">
          {progressData.map((progress) => {
            const user = users.find(user => user.userId === progress.userId);
            const project = projects.find(project => project.id === progress.projectId);
            return (
              <Col md={4} key={progress.id} className="mb-4">
                <StyledCard>
                  <Card.Body>
                    <Card.Title>{project?.title}</Card.Title>
                    <Card.Text>
                      <strong>User:</strong> {user?.email} <br />
                      <strong>Completion Of Work:</strong> {progress.completionOfWork}%
                      <div className="progress mt-2">
                        <div
                          className={`progress-bar ${
                            progress.completionOfWork <= 50
                              ? "bg-warning"
                              : progress.completionOfWork > 50 && progress.completionOfWork <= 75
                              ? "bg-info"
                              : "bg-success"
                          }`}
                          role="progressbar"
                          style={{ width: `${progress.completionOfWork}%` }}
                          aria-valuenow={progress.completionOfWork}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {progress.completionOfWork}%
                        </div>
                      </div>
                    </Card.Text>
                    <Button variant="warning" onClick={() => handleShowModal(progress)}>
                      Edit
                    </Button>
                    &nbsp;
                    <Button variant="danger" onClick={() => handleDelete(progress.id)}>
                      Delete
                    </Button>
                  </Card.Body>
                </StyledCard>
              </Col>
            );
          })}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Progress" : "Add Progress"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUserId">
              <Form.Label>User</Form.Label>
              <Form.Control
                as="select"
                name="userId"
                value={modalData.userId}
                onChange={handleChange}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.email}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formProjectId">
              <Form.Label>Project</Form.Label>
              <Form.Control
                as="select"
                name="projectId"
                value={modalData.projectId}
                onChange={handleChange}
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCompletionOfWork">
              <Form.Label>Completion Of Work</Form.Label>
              <Form.Control
                type="number"
                name="completionOfWork"
                value={modalData.completionOfWork}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Progress;
