import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/requests")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load requests");
        }
        return response.json();
      })
      .then((data) => setRequests(data))
      .catch(() => {
        setError("Unable to connect to the database. Start JSON Server.");
      });
  }, []);

  const filteredRequests =
    filter === "All"
      ? requests
      : requests.filter((request) => request.status === filter);

  const pending = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const inProgress = requests.filter(
    (request) => request.status === "In Progress"
  ).length;

  const completed = requests.filter(
    (request) => request.status === "Completed"
  ).length;

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>📱 FixPoint</h2>
        <p className="side-label">MAIN MENU</p>
        <div className="menu active">▦ Dashboard</div>
        <div className="menu">🛠 Service Requests</div>
        <div className="menu">👥 Customers</div>
        <div className="menu">📊 Reports</div>

        <div className="sidebar-bottom">
          <div className="avatar">AD</div>
          <div>
            <strong>Admin User</strong>
            <p>Service Manager</p>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>Service Dashboard</h1>
            <p>Manage your mobile repair services in one place.</p>
          </div>
          <div className="admin-badge">👤 Administrator</div>
        </header>

        <section className="welcome">
          <div>
            <p className="welcome-tag">OVERVIEW</p>
            <h2>Welcome back, Admin! 👋</h2>
            <p>Here is what's happening at your service centre today.</p>
          </div>
          <div className="welcome-icon">📱</div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <div className="stat-icon blue">📋</div>
            <p>Total Requests</p>
            <h2>{requests.length}</h2>
            <span>All service requests</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">⏳</div>
            <p>Pending</p>
            <h2>{pending}</h2>
            <span>Awaiting service</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">🔧</div>
            <p>In Progress</p>
            <h2>{inProgress}</h2>
            <span>Currently being repaired</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <p>Completed</p>
            <h2>{completed}</h2>
            <span>Successfully completed</span>
          </div>
        </section>

        <section className="table-section">
          <div className="table-heading">
            <div>
              <h2>Recent Service Requests</h2>
              <p>Track and manage customer repair requests.</p>
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option value="All">All Requests</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>REQUEST ID</th>
                  <th>CUSTOMER</th>
                  <th>DEVICE</th>
                  <th>ISSUE</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td>#{request.id}</td>
                    <td>
                      <strong>{request.customer}</strong>
                    </td>
                    <td>{request.phone}</td>
                    <td>{request.issue}</td>
                    <td>{request.date}</td>
                    <td>
                      <span
                        className={`status ${request.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {!error && filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan="6">Loading requests or no data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="table-footer">
            Showing {filteredRequests.length} service requests
          </p>
        </section>

        <footer>
          © 2026 FixPoint Service Centre Dashboard
        </footer>
      </main>
    </div>
  );
}

export default App;