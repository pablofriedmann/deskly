import Navbar from './components/Navbar';
import logo from './assets/logo.svg';

function App() {
  return (
    <>
      <Navbar />

      <section className="hero-section">
        <div className="container text-center py-5">
          <img className="home-logo" src={logo} alt="Deskly logo" />
          <p className="lead">Your freelance CRM, clean and simple.</p>
          <button className="btn btn-primary mt-3">Get Started Now</button>
        </div>
      </section>

      <section id="about" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">About Us</h2>
          <p className="text-center">
            Deskly is a comprehensive, easy-to-use CRM designed specifically for freelancers and small businesses. We help you streamline your workflow, manage clients, track projects, and generate invoices—all in one place.
          </p>
        </div>
      </section>

      <section id="features" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Features</h2>
          <div className="row">
            <div className="col-md-4 text-center">
              <div className="feature-card">
                <i className="fas fa-users"></i>
                <h3>Client Management</h3>
                <p>Keep track of all client interactions, contact details, and project statuses.</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="feature-card">
                <i className="fas fa-tasks"></i>
                <h3>Project Tracking</h3>
                <p>Manage multiple projects, set deadlines, and follow progress with ease.</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="feature-card">
                <i className="fas fa-file-invoice"></i>
                <h3>Invoices & Estimates</h3>
                <p>Quickly create and send invoices, estimate costs, and manage payments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Contact Us</h2>
          <p>
            Have questions? Reach out to us at{' '}
            <a href="mail">mail</a>.
          </p>
        </div>
      </section>

      <footer className="py-4 text-center">
        <div className="container">
          <p>&copy; 2025 Deskly. All rights reserved.</p>
          <a href="mailto:support@deskly.com">Contact Us</a>
        </div>
      </footer>
    </>
  );
}

export default App;