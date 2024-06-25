import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Card, Col } from 'react-bootstrap';
import MainHeader from './MainHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Allocation = () => {
  const [allocations, setAllocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ id: 0, userId: '', projectId: '', createdDate: '', endDate: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchAllocations = async () => {
    const response = await axios.get('http://localhost:5075/api/UserProjectAssignments');
    setAllocations(response.data);
  };

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5075/api/Users');
    setUsers(response.data);
  };

  const fetchProjects = async () => {
    const response = await axios.get('http://localhost:5075/api/Projects');
    setProjects(response.data);
  };

  useEffect(() => {
    fetchAllocations();
    fetchUsers();
    fetchProjects();
  }, []);

  const handleShowModal = (allocation = null) => {
    if (allocation) {
      setModalData({
        id: allocation.id,
        userId: allocation.userId,
        projectId: allocation.projectId,
        createdDate: new Date(allocation.createdDate).toISOString().split('T')[0],
        endDate: new Date(allocation.endDate).toISOString().split('T')[0]
      });
      setIsEditing(true);
    } else {
      setModalData({ id: 0, userId: '', projectId: '', createdDate: '', endDate: '' });
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
      await axios.put(`http://localhost:5075/api/UserProjectAssignments/${modalData.id}`, modalData);
      toast.success('Allocation updated successfully');
    } else {
      await axios.post('http://localhost:5075/api/UserProjectAssignments', modalData);
      toast.success('Allocation added successfully');
    }
    fetchAllocations();
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await axios.delete(`http://localhost:5075/api/UserProjectAssignments/${id}`);
      fetchAllocations();
      toast.success('Allocation deleted successfully');
    }
  };

  return (
    <>
      <MainHeader />

      <div className="container mt-5">
        <Button variant="primary" onClick={() => handleShowModal()}>
          Add Allocation
        </Button>

        <div className="row mt-3">
          {allocations.map((allocation) => {
            const user = users.find(user => user.userId === allocation.userId);
            const project = projects.find(project => project.id === allocation.projectId);
            return (
              <Col md={4} key={allocation.id} className="mb-4">
                <Card
                  className="card-metaverse"
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Card.Body>
                    <Card.Title>{project?.title}</Card.Title>
                    <Card.Text>
                      <strong>User:</strong> {user?.email} <br />
                      <strong>Created Date:</strong> {new Date(allocation.createdDate).toLocaleDateString()} <br />
                      <strong>End Date:</strong> {new Date(allocation.endDate).toLocaleDateString()}
                    </Card.Text>
                    <Button variant="warning" onClick={() => handleShowModal(allocation)}>
                      Edit
                    </Button>&nbsp;
                    <Button variant="danger" onClick={() => handleDelete(allocation.id)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Allocation' : 'Add Allocation'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUserId">
              <Form.Label>User</Form.Label>
              <Form.Control as="select" name="userId" value={modalData.userId} onChange={handleChange}>
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
              <Form.Control as="select" name="projectId" value={modalData.projectId} onChange={handleChange}>
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCreatedDate">
              <Form.Label>Created Date</Form.Label>
              <Form.Control
                type="date"
                name="createdDate"
                value={modalData.createdDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={modalData.endDate}
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

export default Allocation;
