import React from 'react';
import { Container, Card, Button, ListGroup, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const tasks = [
    { id: 1, name: 'Finish logo design for Client A', dueDate: '2025-05-30' },
    { id: 2, name: 'Submit invoice for Project B', dueDate: '2025-06-01' },
    { id: 3, name: 'Meeting with Client C', dueDate: '2025-06-03' },
  ];

  const financialData = {
    income: 2500,
    expenses: 1200,
  };

  const recentProjects = [
    { id: 1, name: 'Website Redesign', client: 'Client A' },
    { id: 2, name: 'Marketing Campaign', client: 'Client B' },
  ];

  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [financialData.income, financialData.expenses],
        backgroundColor: ['#34D399', '#F87171'],
        borderColor: ['#34D399', '#F87171'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Category',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Welcome to your Dashboard!</h2>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Upcoming Tasks & Deadlines</Card.Title>
              <ListGroup variant="flush">
                {tasks.map((task) => (
                  <ListGroup.Item key={task.id} className="dashboard-list-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{task.name}</span>
                      <span className="text-muted">{task.dueDate}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Button
                as={Link}
                to="/tasks"
                variant="outline-primary"
                size="sm"
                className="mt-3 dashboard-action-btn"
              >
                View All Tasks
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Financial Snapshot (This Month)</Card.Title>
              <div className="mb-3">
                <p>
                  Income: <span className="text-success">${financialData.income}</span> | Expenses: <span className="text-danger">${financialData.expenses}</span>
                </p>
                <p>Net: <span className={financialData.income - financialData.expenses >= 0 ? 'text-success' : 'text-danger'}>
                  ${financialData.income - financialData.expenses}
                </span></p>
              </div>
              <div className="chart-container">
                <Bar data={chartData} options={chartOptions} />
              </div>
              <Button
                as={Link}
                to="/finances"
                variant="outline-primary"
                size="sm"
                className="mt-3 dashboard-action-btn"
              >
                View Finances
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Recent Projects</Card.Title>
              <ListGroup variant="flush">
                {recentProjects.map((project) => (
                  <ListGroup.Item key={project.id} className="dashboard-list-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{project.name}</span>
                      <span className="text-muted">{project.client}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Button
                as={Link}
                to="/projects"
                variant="outline-primary"
                size="sm"
                className="mt-3 dashboard-action-btn"
              >
                View All Projects
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Quick Actions</Card.Title>
              <div className="d-flex flex-wrap gap-2">
                <Button
                  as={Link}
                  to="/tasks"
                  variant="primary"
                  className="dashboard-action-btn"
                >
                  <FaPlus className="me-2" /> Add Task
                </Button>
                <Button
                  as={Link}
                  to="/finances"
                  variant="primary"
                  className="dashboard-action-btn"
                >
                  <FaPlus className="me-2" /> Create Invoice
                </Button>
                <Button
                  as={Link}
                  to="/clients"
                  variant="primary"
                  className="dashboard-action-btn"
                >
                  <FaPlus className="me-2" /> Add Client
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;