import { Link } from "react-router-dom";

export default function NoMatch() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Page Not Found</h1>
      <p>We couldn't find the page you're looking for.</p>
      <p>
        Return to <Link to="/login">Login Page</Link>
      </p>
      <footer style={{ position: "fixed", bottom: "0", width: "100%", background: "#f0f0f0", padding: "10px 0" }}>
        <p>&copy; {new Date().getFullYear()} {process.env.REACT_APP_PROJECT_TITLE}. All rights reserved.</p>
      </footer>
    </div>
  );
}
