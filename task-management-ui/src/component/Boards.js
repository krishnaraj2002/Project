import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MainHeader from "./MainHeader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const StyledCard = styled(Card)`
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  border-radius: 10px;
  border: none;

  &:hover {
    transform: scale(1.05);
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }

  .card-text {
    font-size: 1rem;
    color: #555;
  }

  .btn {
    margin-right: 10px;
  }

  .btn-warning {
    background-color: #f0ad4e;
    border: none;
  }

  .btn-danger {
    background-color: #d9534f;
    border: none;
  }
`;

const BoardsContainer = styled(Container)`
  margin-top: 1.5rem;
`;

const FormContainer = styled.div`
  margin-bottom: 1rem;

  h3 {
    margin-bottom: 1rem;
  }

  .form-card {
    padding: 1.5rem;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    border: none;
  }
`;

function Boards() {
  const [boards, setBoards] = useState([]);
  const [boardName, setBoardName] = useState('');
  const [userId, setUserId] = useState(''); // Assuming user ID is a string for flexibility
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [editedBoardName, setEditedBoardName] = useState('');
  const [editedUserId, setEditedUserId] = useState('');

  useEffect(() => {
    fetchBoards();
    fetchUsers();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await axios.get('http://localhost:5075/api/Boards');
      setBoards(response.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5075/api/Users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddBoard = async () => {
    try {
      const response = await axios.post('http://localhost:5075/api/Boards', { boardName, userId });
      setBoards([...boards, response.data]);
      setBoardName('');
      setUserId(''); // Reset user selection after adding board
      toast.success('Board added successfully');
    } catch (error) {
      console.error('Error adding board:', error);
      toast.error('Failed to add board');
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await axios.delete(`http://localhost:5075/api/Boards/${boardId}`);
      setBoards(boards.filter(board => board.boardId !== boardId));
      setShowDeleteModal(false);
      toast.success('Board deleted successfully');
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const handleEditBoard = async () => {
    try {
      const data = {
        boardName: editedBoardName,
        userId: editedUserId,
        boardId: selectedBoardId
      };
      await axios.put(`http://localhost:5075/api/Boards/${selectedBoardId}`, data);
      const updatedBoards = boards.map(board => {
        if (board.boardId === selectedBoardId) {
          return { ...board, boardName: editedBoardName, userId: editedUserId };
        }
        return board;
      });
      setBoards(updatedBoards);
      setShowEditModal(false);
      toast.success('Board updated successfully');
    } catch (error) {
      console.error('Error updating board:', error);
      toast.error('Failed to update board');
    }
  };

  return (
    <>
      <MainHeader />
      <BoardsContainer>
        <FormContainer>
          <h3>Add Board</h3>
          <Card className="form-card">
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formBoardName">
                  <Form.Label>Board Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    placeholder="Enter board name"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formUserId">
                  <Form.Label>User</Form.Label>
                  <Form.Select value={userId} onChange={(e) => setUserId(e.target.value)}>
                    <option value="">Select user...</option>
                    {users.map(user => (
                      <option key={user.userId} value={user.userId}>{user.email}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Button variant="primary" onClick={handleAddBoard}>Add Board</Button>
            </Form>
          </Card>
        </FormContainer>
        <Row xs={1} md={2} lg={3} className="g-4">
          {boards.map(board => (
            <Col key={board.boardId}>
              <StyledCard className="h-100">
                <Card.Body>
                  <Card.Title>{board.boardName}</Card.Title>
                  <Card.Text>User: {users.find(user => user.userId === board.userId)?.email}</Card.Text>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setEditedBoardName(board.boardName);
                      setEditedUserId(board.userId);
                      setSelectedBoardId(board.boardId);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedBoardId(board.boardId);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </StyledCard>
            </Col>
          ))}
        </Row>
      </BoardsContainer>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this board?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => handleDeleteBoard(selectedBoardId)}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditBoardName" className="mb-3">
              <Form.Label>New Board Name</Form.Label>
              <Form.Control
                type="text"
                value={editedBoardName}
                onChange={(e) => setEditedBoardName(e.target.value)}
                placeholder="Enter new board name"
              />
            </Form.Group>
            <Form.Group controlId="formEditUserId" className="mb-3">
              <Form.Label>New User</Form.Label>
              <Form.Select value={editedUserId} onChange={(e) => setEditedUserId(e.target.value)}>
                <option value="">Select user...</option>
                {users.map(user => (
                  <option key={user.userId} value={user.userId}>{user.email}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEditBoard}>Save</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default Boards;
