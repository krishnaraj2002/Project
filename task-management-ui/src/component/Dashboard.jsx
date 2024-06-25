import React, { useState, useEffect } from 'react';
import MainHeader from './MainHeader';
import UsersList from './UsersList';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [boards, setBoards] = useState([]);
  const [users, setUsers] = useState([]);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchBoards();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5075/api/Projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

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
      const response = await axios.post('http://localhost:5075/api/Boards', {
        boardName,
        userId: selectedUserId
      });
      setBoards([...boards, response.data]);
      setBoardName('');
      setSelectedUserId('');
      setShowBoardModal(false);
      fetchProjects(); // Update projects after adding board
    } catch (error) {
      console.error('Error adding board:', error);
    }
  };

  return (
    <>
      <MainHeader />
      <center>
        <section
          className="hero"
          style={{
            backgroundImage: 'url(https://img.freepik.com/premium-photo/luxury-gradient-background-your-graphic-design-works-with-free-space-insert-text_7954-9944.jpg?w=1060)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: '50px',
            color: 'white'
          }}
        >
          <div className="hero-content">
            <h2>Welcome to Duplix Dashboard and Explore on it</h2>
            <p>Duplix is a popular project management and productivity tool that provides a visual and interactive way to manage tasks and projects. It is widely used by individuals and teams to organize work, track progress, and collaborate effectively.</p>
          </div>
        </section>
      </center>
      <Container>
        <Row>
          <Col>
            <UsersList />
            <h3 className="mt-4">Projects</h3>
            <StyledRow>
              {projects.map(project => (
                <Col key={project.id} className="mb-4">
                  <StyledCard className="project-card">
                    <Card.Body>
                      <Card.Title>{project.title}</Card.Title>
                      <Card.Text>{project.description}</Card.Text>
                      <Card.Text><small className="text-muted">Due Date: {new Date(project.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</small></Card.Text>
                    </Card.Body>
                  </StyledCard>
                </Col>
              ))}
            </StyledRow>

            <h3 className="mt-4">Boards</h3>
            <StyledRow>
              {boards.map(board => (
                <Col key={board.boardId} className="mb-4">
                  <StyledCard className="board-card">
                    <Card.Body>
                      <Card.Title>{board.boardName}</Card.Title>
                      <Card.Text>User: {users.find(user => user.userId === board.userId)?.email}</Card.Text>
                    </Card.Body>
                  </StyledCard>
                </Col>
              ))}
            </StyledRow>
          </Col>
        </Row>
      </Container>

      <Modal show={showBoardModal} onHide={() => setShowBoardModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBoardName">
              <Form.Label>Board Name</Form.Label>
              <Form.Control
                type="text"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                placeholder="Enter board name"
              />
            </Form.Group>
            <Form.Group controlId="formUserId">
              <Form.Label>User</Form.Label>
              <Form.Select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
                <option value="">Select user...</option>
                {users.map(user => (
                  <option key={user.userId} value={user.userId}>{user.email}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBoardModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddBoard}>Add Board</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const StyledRow = styled(Row)`
  .project-card,
  .board-card {
    transition: transform 0.3s;
  }

  .project-card:hover,
  .board-card:hover {
    transform: scale(1.05);
  }
`;

const StyledCard = styled(Card)`
  margin-bottom: 0;
`;

export default Dashboard;
