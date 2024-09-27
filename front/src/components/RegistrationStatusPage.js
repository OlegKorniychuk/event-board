import { Link, useParams } from "react-router-dom";

export function RegistrationStatusPage() {
  const params = useParams();
  const status = params.status

  return (
    <div className="main-container">
      <div className="card-container">
        {status === "success" ? (
          <h3 className="header">You have registered successfully!</h3>
        ) : (
          <h3 className="header">Registration failed!</h3>
        )}
        <div className="button-container">
          <Link to="/events" className="link-button">Home</Link>
        </div>
      </div>
    </div>
  );
}