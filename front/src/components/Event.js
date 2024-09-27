import { Link } from "react-router-dom";

export function Event(props) {
  const date = new Date(props.event.date);
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedDate = dd + '-' + mm + '-' + yyyy;
  return (
    <div className="card-container">
      <h2>{props.event.title}</h2>
      <h3>{props.event.description}</h3>
      <h3>{formattedDate}</h3>
      <h3>Organizer: {props.event.organizer}</h3>
      <div className="button-container">
        <Link to={`/events/${props.event._id}/register`} state={{ title: props.event.title }} className="link-button">Register</Link>
        <Link to={`/events/${props.event._id}`} className="link-button">View</Link>
      </div>
    </div>
  )
};