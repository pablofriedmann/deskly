import React, { useState } from 'react';
import { Container, Card, Button, Table, Modal, Form, Row, Col } from 'react-bootstrap';
import { FaPlus, FaFileInvoice } from 'react-icons/fa';

function Finances() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2025-05-01', description: 'Payment for Website Redesign', amount: 1500, type: 'Income', project: 'Website Redesign' },
    { id: 2, date: '2025-05-05', description: 'Marketing Campaign Fee', amount: 1000, type: 'Income', project: 'Marketing Campaign' },
    { id: 3, date: '2025-05-10', description: 'Software Subscription', amount: 200, type: 'Expense', project: 'Website Redesign' },
    { id: 4, date: '2025-05-15', description: 'Advertising Costs', amount: 500, type: 'Expense', project: 'Marketing Campaign' },
  ]);

  const availableProjects = [
    { id: 1, name: 'Website Redesign', client: 'Client A', deadline: '2025-06-15', tasks: [1, 2] },
    { id: 2, name: 'Marketing Campaign', client: 'Client B', deadline: '2025-07-01', tasks: [3] },
  ];

  const [invoices, setInvoices] = useState([]);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({ date: '', description: '', amount: '', type: 'Income', project: '' });
  const [newInvoice, setNewInvoice] = useState({ project: '', amount: '', dueDate: '', description: '' });

  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const netAmount = totalIncome - totalExpenses;

  const handleAddTransaction = () => {
    setNewTransaction({ date: '', description: '', amount: '', type: 'Income', project: '' });
    setShowTransactionModal(true);
  };

  const handleCreateInvoice = () => {
    setNewInvoice({ project: '', amount: '', dueDate: '', description: '' });
    setShowInvoiceModal(true);
  };

  const handleSaveTransaction = () => {
    setTransactions([...transactions, { id: transactions.length + 1, ...newTransaction }]);
    setShowTransactionModal(false);
    setNewTransaction({ date: '', description: '', amount: '', type: 'Income', project: '' });
  };

  const handleSaveInvoice = () => {
    setInvoices([...invoices, { id: invoices.length + 1, ...newInvoice }]);
    setShowInvoiceModal(false);
    setNewInvoice({ project: '', amount: '', dueDate: '', description: '' });
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Finances</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Total Income</Card.Title>
              <h4 className="text-success">${totalIncome}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Total Expenses</Card.Title>
              <h4 className="text-danger">${totalExpenses}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Net Amount</Card.Title>
              <h4 className={netAmount >= 0 ? 'text-success' : 'text-danger'}>${netAmount}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="dashboard-card mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title>Transactions</Card.Title>
            <Button variant="primary" onClick={handleAddTransaction} className="dashboard-action-btn">
              <FaPlus className="me-2" /> Add Transaction
            </Button>
          </div>
          {transactions.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Project</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td className={transaction.type === 'Income' ? 'text-success' : 'text-danger'}>
                      ${transaction.amount}
                    </td>
                    <td>{transaction.type}</td>
                    <td>{transaction.project}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No transactions found. Add a transaction to get started!</p>
          )}
        </Card.Body>
      </Card>

      <Card className="dashboard-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title>Invoices</Card.Title>
            <Button variant="primary" onClick={handleCreateInvoice} className="dashboard-action-btn">
              <FaFileInvoice className="me-2" /> Create Invoice
            </Button>
          </div>
          {invoices.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.project}</td>
                    <td>${invoice.amount}</td>
                    <td>{invoice.dueDate}</td>
                    <td>{invoice.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No invoices found. Create an invoice to get started!</p>
          )}
        </Card.Body>
      </Card>

      {/* Modal for Adding Transactions */}
      <Modal show={showTransactionModal} onHide={() => setShowTransactionModal(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                placeholder="Enter description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) || '' })}
                placeholder="Enter amount"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project</Form.Label>
              <Form.Select
                value={newTransaction.project}
                onChange={(e) => setNewTransaction({ ...newTransaction, project: e.target.value })}
              >
                <option value="">Select a project</option>
                {availableProjects.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTransactionModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTransaction}>
            Add Transaction
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Creating Invoices */}
      <Modal show={showInvoiceModal} onHide={() => setShowInvoiceModal(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project</Form.Label>
              <Form.Select
                value={newInvoice.project}
                onChange={(e) => setNewInvoice({ ...newInvoice, project: e.target.value })}
              >
                <option value="">Select a project</option>
                {availableProjects.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={newInvoice.amount}
                onChange={(e) => setNewInvoice({ ...newInvoice, amount: parseFloat(e.target.value) || '' })}
                placeholder="Enter amount"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={newInvoice.dueDate}
                onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newInvoice.description}
                onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                placeholder="Enter invoice description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInvoiceModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveInvoice}>
            Create Invoice
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Finances;