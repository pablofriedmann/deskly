import React, { useState } from 'react';
import { Container, Card, Button, Table, Modal, Form, Row, Col } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function Resources() {
  const [timeEntries, setTimeEntries] = useState([
    { id: 1, task: 'Finish logo design for Client A', date: '2025-05-25', duration: 3, notes: 'Worked on initial sketches' },
    { id: 2, task: 'Submit invoice for Project B', date: '2025-05-26', duration: 1, notes: 'Prepared invoice' },
    { id: 3, task: 'Meeting with Client C', date: '2025-05-27', duration: 2, notes: 'Discussed project requirements' },
  ]);

  const availableTasks = [
    { id: 1, name: 'Finish logo design for Client A', dueDate: '2025-05-30', status: 'To Do' },
    { id: 2, name: 'Submit invoice for Project B', dueDate: '2025-06-01', status: 'In Progress' },
    { id: 3, name: 'Meeting with Client C', dueDate: '2025-06-03', status: 'Done' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [newTimeEntry, setNewTimeEntry] = useState({ task: '', date: '', duration: '', notes: '' });
  const [editTimeEntry, setEditTimeEntry] = useState(null);

  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.duration, 0);

  const handleAddTimeEntry = () => {
    setEditTimeEntry(null);
    setNewTimeEntry({ task: '', date: '', duration: '', notes: '' });
    setShowModal(true);
  };

  const handleEditTimeEntry = (entry) => {
    setEditTimeEntry(entry);
    setNewTimeEntry({
      task: entry.task,
      date: entry.date,
      duration: entry.duration,
      notes: entry.notes,
    });
    setShowModal(true);
  };

  const handleDeleteTimeEntry = (id) => {
    setTimeEntries(timeEntries.filter((entry) => entry.id !== id));
  };

  const handleSaveTimeEntry = () => {
    if (editTimeEntry) {
      setTimeEntries(
        timeEntries.map((entry) =>
          entry.id === editTimeEntry.id ? { ...entry, ...newTimeEntry, duration: parseFloat(newTimeEntry.duration) || 0 } : entry
        )
      );
    } else {
      setTimeEntries([
        ...timeEntries,
        { id: timeEntries.length + 1, ...newTimeEntry, duration: parseFloat(newTimeEntry.duration) || 0 },
      ]);
    }
    setShowModal(false);
    setNewTimeEntry({ task: '', date: '', duration: '', notes: '' });
    setEditTimeEntry(null);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Resources</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Total Hours Tracked</Card.Title>
              <h4>{totalHours} hours</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="dashboard-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title>Time Tracking</Card.Title>
            <Button variant="primary" onClick={handleAddTimeEntry} className="dashboard-action-btn">
              <FaPlus className="me-2" /> Add Time Entry
            </Button>
          </div>
          {timeEntries.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Date</th>
                  <th>Duration (Hours)</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {timeEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.task}</td>
                    <td>{entry.date}</td>
                    <td>{entry.duration}</td>
                    <td>{entry.notes}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditTimeEntry(entry)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteTimeEntry(entry.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No time entries found. Add a time entry to get started!</p>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task</Form.Label>
              <Form.Select
                value={newTimeEntry.task}
                onChange={(e) => setNewTimeEntry({ ...newTimeEntry, task: e.target.value })}
              >
                <option value="">Select a task</option>
                {availableTasks.map((task) => (
                  <option key={task.id} value={task.name}>
                    {task.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newTimeEntry.date}
                onChange={(e) => setNewTimeEntry({ ...newTimeEntry, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (Hours)</Form.Label>
              <Form.Control
                type="number"
                step="0.5"
                value={newTimeEntry.duration}
                onChange={(e) => setNewTimeEntry({ ...newTimeEntry, duration: e.target.value })}
                placeholder="Enter duration in hours"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newTimeEntry.notes}
                onChange={(e) => setNewTimeEntry({ ...newTimeEntry, notes: e.target.value })}
                placeholder="Enter notes"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTimeEntry}>
            {editTimeEntry ? 'Save Changes' : 'Add Time Entry'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Resources;