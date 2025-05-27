import React, { useState } from 'react';
import { Container, Card, Button, Table, Modal, Form } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Finish logo design for Client A', dueDate: '2025-05-30', status: 'To Do' },
    { id: 2, name: 'Submit invoice for Project B', dueDate: '2025-06-01', status: 'In Progress' },
    { id: 3, name: 'Meeting with Client C', dueDate: '2025-06-03', status: 'Done' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', dueDate: '', status: 'To Do' });
  const [editTask, setEditTask] = useState(null);

  const handleAddTask = () => {
    setEditTask(null);
    setNewTask({ name: '', dueDate: '', status: 'To Do' });
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setNewTask({ name: task.name, dueDate: task.dueDate, status: task.status });
    setShowModal(true);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSaveTask = () => {
    if (editTask) {
      // Update existing task
      setTasks(
        tasks.map((task) =>
          task.id === editTask.id ? { ...task, ...newTask } : task
        )
      );
    } else {
      setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
    }
    setShowModal(false);
    setNewTask({ name: '', dueDate: '', status: 'To Do' });
    setEditTask(null);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Tasks</h2>
      <Card className="dashboard-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title>Manage Tasks</Card.Title>
            <Button variant="primary" onClick={handleAddTask} className="dashboard-action-btn">
              <FaPlus className="me-2" /> Add Task
            </Button>
          </div>
          {tasks.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.dueDate}</td>
                    <td>
                      <span
                        className={`badge ${
                          task.status === 'To Do'
                            ? 'bg-warning'
                            : task.status === 'In Progress'
                            ? 'bg-info'
                            : 'bg-success'
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditTask(task)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No tasks found. Add a task to get started!</p>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editTask ? 'Edit Task' : 'Add Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                placeholder="Enter task name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTask}>
            {editTask ? 'Save Changes' : 'Add Task'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Tasks;