import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <div className="main-container">
      <div className="card-container">
        <h3 className="header">Page Not Found</h3>
        <div className="button-container">
          <Link to='/events' className="link-button">Home</Link>
        </div>
      </div>
    </div>
  )
};
