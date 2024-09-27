import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { User } from "./User";
import { Chart } from "./Chart";
import { fetchData } from "../utils/fetchData";

export function EventPage(props) {
  const [eventId, setEventId] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataPoints, setdataPoints] = useState([]);

  const params = useParams();

  useEffect(() => {
    setEventId(params.eventId);
  }, [params.eventId])

  useEffect(() => {
    if (!eventId) return;

    const fetchEventDetails = async () => {
      try {
        const response = await fetchData(`/events/${eventId}`);
        setEventDetails(response.data.event);
      } catch (err) {
        console.log(err);
        setError(err);
        setEventDetails(null);
      } finally {
        setLoading(false);
      }
    }

    const fetchRegistrationStats = async () => {
      try {
        const response = await fetchData(`/events/${eventId}/registrationStats`);
        const stats = response.data.registrationsPerDay;
        const chartData = stats.map((day) => ({
          x: new Date(day.date),
          y: day.totalRegistrations
        }));
        
        setdataPoints(chartData);
      } catch (err) {
        console.log(err);
        setError(err);
        setdataPoints([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEventDetails();
    fetchRegistrationStats();
  }, [eventId]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredParticipants = eventDetails?.participants?.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p>Error!</p>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div className="main-container">
      <div className="header HomeHeader">
        <h1>Who has registered for {eventDetails.title}:</h1>
        <div className="button-container">
          <Link to='/events' className="link-button">Back</Link>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by full name or email..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div>
        {dataPoints.length > 0 ? (
          <Chart dataPoints={dataPoints}/>
          ) : (
            <div>No chart data</div>
          )}
      </div>

      <div className="cards-container">
        {filteredParticipants && filteredParticipants.length > 0 ? (
          filteredParticipants.map((user) => (
            <User user={user} key={user._id} />
          ))
        ) : (
          <p>No participants found</p>
        )}
      </div>
    </div>
  )
};