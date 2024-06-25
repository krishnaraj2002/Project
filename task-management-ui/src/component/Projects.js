import React, { useState, useEffect } from 'react';
import MainHeader from "./MainHeader";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 4rem;
`;

const AddProjectContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Glow effect */

  /* Centering for mobile */
  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ProjectRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProjectCard = styled.div`
  flex: 0 0 calc(33.33% - 1rem);
  margin-bottom: 1rem;
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 992px) {
    flex: 0 0 calc(50% - 1rem);
  }

  @media (max-width: 576px) {
    flex: 1 0 100%;
  }
`;

const CardBody = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 1rem;
`;

const EditButton = styled.button`
  margin-right: 0.5rem;
`;

const DeleteButton = styled.button`
  margin-left: 0.5rem;
`;

function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    dueDate: ""
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5075/api/Projects');
      setProjects(response.data);      
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Error fetching projects');
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
  };

  const handleEditProject = async () => {
    try {
      await axios.put(`http://localhost:5075/api/Projects/${editingProject.id}`, editingProject);      
      fetchProjects();
      setEditingProject(null);
      toast.success('Project updated successfully');
    } catch (error) {
      console.error('Error editing project:', error);
      toast.error('Error editing project');
    }
  };

  const handleDeleteClick = (projectId) => {
    setDeleteProjectId(projectId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5075/api/Projects/${deleteProjectId}`);
      toast.success('Project deleted successfully');
      fetchProjects();
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Error deleting project');
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeleteProjectId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddProject = async () => {
    try {
      await axios.post('http://localhost:5075/api/Projects', newProject);
      toast.success('Project added successfully');
      setNewProject({
        title: "",
        description: "",
        dueDate: ""
      });
      fetchProjects();
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('Error adding project');
    }
  };

  return (
    <>
      <MainHeader />
      <Container className="container">
        <h2>Projects</h2>
        <AddProjectContainer className="row">
          <div className="col-md-6">
            <input type="text" className="form-control mb-2" placeholder="Title" name="title" value={newProject.title} onChange={handleInputChange} style={{ borderRadius: '8px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }} />
          </div>
          <div className="col-md-6">
            <input type="date" className="form-control mb-2" placeholder="Due Date" name="dueDate" value={newProject.dueDate} onChange={handleInputChange} style={{ borderRadius: '8px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }} />
          </div>
          <div className="col-md-12">
            <textarea className="form-control mb-2" rows="3" placeholder="Description" name="description" value={newProject.description} onChange={handleInputChange} style={{ borderRadius: '8px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}></textarea>
          </div>
          <div className="col-md-12">
            <button className="btn btn-primary" onClick={handleAddProject} style={{ borderRadius: '8px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}>Add Project</button>
          </div>
        </AddProjectContainer>
        <ProjectRow className="row">
          {projects.map(project => (
            <ProjectCard key={project.id} className="col-md-4 mb-4">
              <div className="card">
                <CardBody className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                  <p className="card-text"><small className="text-muted">Due Date: {new Date(project.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</small></p>
                  <EditButton className="btn btn-warning mr-2" onClick={() => handleEditClick(project)}>Edit</EditButton>
                  <DeleteButton className="btn btn-danger" onClick={() => handleDeleteClick(project.id)}>Delete</DeleteButton>
                </CardBody>
              </div>
            </ProjectCard>
          ))}
        </ProjectRow>
      </Container>
      {editingProject && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Project</h5>
                <button type="button" className="close" onClick={() => setEditingProject(null)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="title" name="title" value={editingProject.title} onChange={(e) => setEditingProject({...editingProject, title: e.target.value})} style={{ borderRadius: '8px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }} />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea className="form-control" id="description" name="description" value={editingProject.description} onChange={(e) => setEditingProject({...editingProject, description: e.target.value})} style={{ borderRadius: '8px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date</label>
                  <input type="date" className="form-control" id="dueDate" name="dueDate" value={editingProject.dueDate} onChange={(e) => setEditingProject({...editingProject, dueDate: e.target.value})} style={{ borderRadius: '8px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingProject(null)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleEditProject}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
     
     {showDeleteConfirmation && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="close" onClick={handleCancelDelete} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this project?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default Projects;
