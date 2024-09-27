export function User(props) {
  return (
    <div className="card-container">
      <h2>{props.user.fullName}</h2>
      <h3>{props.user.email}</h3> 
    </div>
  )
};