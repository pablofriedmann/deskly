import React, { useState } from 'react';
import { Container, Card, Button, Table, Modal, Form } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function Projects() {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', client: 'Client A', deadline: '2025-06-15', tasks: [1, 2] },
    { id: 2, name: 'Marketing Campaign', client: 'Client B', deadline: '2025-07-01', tasks: [3] },
  ]);

  const availableTasks = [
    { id: 1, name: 'Finish logo design for Client A', dueDate: '2025-05-30', status: 'To Do' },
    { id: 2, name: 'Submit invoice for Project B', dueDate: '2025-06-01', status: 'In Progress' },
    { id: 3, name: 'Meeting with Client C', dueDate: '2025-06-03', status: 'Done' },
  ];

  const availableClients = [
    { id: 1, name: 'Client A', email: 'clienta@example.com' },
    { id: 2, name: 'Client B', email: 'clientb@example.com' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', client: '', deadline: '', tasks: [] });
  const [editProject, setEditProject] = useState(null);

  const handleAddProject = () => {
    setEditProject(null);
    setNewProject({ name: '', client: '', deadline: '', tasks: [] });
    setShowModal(true);
  };

  const handleEditProject = (project) => {
    setEditProject(project);
    setNewProject({
      name: project.name,
      client: project.client,
      deadline: project.deadline,
      tasks: project.tasks,
    });
    setShowModal(true);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleSaveProject = () => {
    if (editProject) {
      setProjects(
        projects.map((project) =>
          project.id === editProject.id ? { ...project, ...newProject } : project
        )
      );
    } else {
      // Add new project
      setProjects([...projects, { id: projects.length + 1, ...newProject }]);
    }
    setShowModal(false);
    setNewProject({ name: '', client: '', deadline: '', tasks: [] });
    setEditProject(null);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Projects</h2>
      <Card className="dashboard-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title>Manage Projects</Card.Title>
            <Button variant="primary" onClick={handleAddProject} className="dashboard-action-btn">
              <FaPlus className="me-2" /> Add Project
            </Button>
          </div>
          {projects.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Client</th>
                  <th>Deadline</th>
                  <th>Tasks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{project.client}</td>
                    <td>{project.deadline}</td>
                    <td>
                      {project.tasks.length > 0
                        ? project.tasks
                            .map((taskId) => {
                              const task = availableTasks.find((t) => t.id === taskId);
                              return task ? task.name : '';
                            })
                            .join(', ')
                        : 'No tasks assigned'}
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditProject(project)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No projects found. Add a project to get started!</p>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editProject ? 'Edit Project' : 'Add Project'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                placeholder="Enter project name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Client</Form.Label>
              <Form.Select
                value={newProject.client}
                onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
              >
                <option value="">Select a client</option>
                {availableClients.map((client) => (
                  <option key={client.id} value={client.name}>
                    {client.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                value={newProject.deadline}
                onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Associated Tasks</Form.Label>
              <Form.Select
                multiple
                value={newProject.tasks}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    tasks: Array.from(e.target.selectedOptions, (option) => parseInt(option.value)),
                  })
                }
              >
                {availableTasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.name} (Due: {task.dueDate})
                  </option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted">
                Hold Ctrl (or Cmd on Mac) to select multiple tasks.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveProject}>
            {editProject ? 'Save Changes' : 'Add Project'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Projects;