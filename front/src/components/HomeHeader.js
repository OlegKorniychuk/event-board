export function HomeHeader ({ sortValue, onSortChange }) {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  }

  return (
    <div className="HomeHeader">
      <header className="header">
        <h1>Event Board</h1>
        <div>
          <select id="sort" onChange={handleSortChange}>
            <option value="title">Title</option>
            <option value="date" selected="selected">Date</option>
            <option value="organizer">Organizer</option>
          </select> 
        </div>
      </header>
    </div>
  );
} 