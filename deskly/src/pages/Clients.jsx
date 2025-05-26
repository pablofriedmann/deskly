import React, { useState } from 'react';
import { Container, Card, Button, Table, Modal, Form } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function Clients() {
  const [clients, setClients] = useState([
    { id: 1, name: 'Client A', email: 'clienta@example.com' },
    { id: 2, name: 'Client B', email: 'clientb@example.com' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '' });
  const [editClient, setEditClient] = useState(null);

  const handleAddClient = () => {
    setEditClient(null);
    setNewClient({ name: '', email: '' });
    setShowModal(true);
  };

  const handleEditClient = (client) => {
    setEditClient(client);
    setNewClient({ name: client.name, email: client.email });
    setShowModal(true);
  };

  const handleDeleteClient = (id) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  const handleSaveClient = () => {
    if (editClient) {
      setClients(
        clients.map((client) =>
          client.id === editClient.id ? { ...client, ...newClient } : client
        )
      );
    } else {
      setClients([...clients, { id: clients.length + 1, ...newClient }]);
    }
    setShowModal(false);
    setNewClient({ name: '', email: '' });
    setEditClient(null);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Clients</h2>
      <Card className="dashboard-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title>Manage Clients</Card.Title>
            <Button variant="primary" onClick={handleAddClient} className="dashboard-action-btn">
              <FaPlus className="me-2" /> Add Client
            </Button>
          </div>
          {clients.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditClient(client)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteClient(client.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No clients found. Add a client to get started!</p>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editClient ? 'Edit Client' : 'Add Client'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                placeholder="Enter client name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                placeholder="Enter client email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveClient}>
            {editClient ? 'Save Changes' : 'Add Client'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Clients;