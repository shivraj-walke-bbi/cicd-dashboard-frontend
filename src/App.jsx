import React, { useEffect, useState } from "react";
import axios from "axios";

// Your API base URL
const API_URL = "https://cicd-dashboard-api.onrender.com/builds";

function App() {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setBuilds(res.data);
        setLoading(false);
      })
      .catch(err => {
        alert("Error fetching data: " + err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: 1200, margin: "auto" }}>
      <h2>CI/CD Build Dashboard</h2>
      {loading ? (
        <div>Loading...</div>
      ) : builds.length === 0 ? (
        <div>No builds found.</div>
      ) : (
        <table border="1" cellPadding={6} style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Package Name</th>
              <th>App Version</th>
              <th>Build</th>
              <th>Pull Request ID</th>
              <th>Total Tests</th>
              <th>Passed</th>
              <th>LOC</th>
              <th>Static Code Analysis</th>
              <th>Complexity</th>
              <th>Released</th>
              <th>Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {builds.map((build, idx) => (
              <tr key={build.id || idx}>
                <td>{build.project_id}</td>
                <td>{build.package_name}</td>
                <td>{build.app_version}</td>
                <td>{build.build}</td>
                <td>{build.pull_request_id}</td>
                <td>{build.total_tests}</td>
                <td>{build.success_tests}</td>
                <td>{build.loc}</td>
                <td>{build.static_code_analysis}</td>
                <td>{build.cyclomatic_complexity}</td>
                <td>{build.released === 1 ? "✅" : ""}</td>
                <td>{build.timestamp ? new Date(build.timestamp).toLocaleString() : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
