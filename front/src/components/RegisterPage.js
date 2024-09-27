import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function RegisterPage() {
  const [eventId, setEventId] = useState(null);
  const [eventTitle, setEventTitle] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    whereHeard: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    date: '',
    email: '',
    whereHeard: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Full Name should be at least 3 characters long';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.whereHeard) {
      newErrors.whereHeard = 'This field is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    if (!validateForm()) {
      console.log("Form has errors");
      console.log(errors);
      return;
    }
    try {
      const data = await fetchData(
        `http://localhost:3500/api/events/${eventId}/register`,
        "PATCH",
        { 'Content-Type': 'application/json' },
        formData
      )

      if (data.status !== "success") {
        throw new Error(data.message);
      }
      navigate(`/events/${eventId}/register/success`)
    } catch (err) {
      navigate(`/events/${eventId}/register/failed`)
      console.log(err.message);
    }
  };

  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    setEventId(params.eventId);
  }, [params.eventId]);

  useEffect(() => {
    const { state } = location;
    if (state && state.title) {
      setEventTitle(state.title);
    }
  }, [location]);

  return (
    <div className="main-container">
      <div className="card-container">
        <div className="card-header">
          Register for {eventTitle}
        </div>

        <div>
          <div  className="form-section">
            <label for="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>

          <div  className="form-section">
            <label for="deateOfBirth">Date of Birth:</label>
            <DatePicker
              id="dateOfBirth" 
              dateFormat="dd/MM/yyyy" 
              maxDate={new Date()}
              selected={formData.dateOfBirth}  
              showYearDropdown
              dateFormatCalendar="MMMM"
              yearDropdownItemNumber={100}
              scrollableYearDropdown
              onChange={(date) => setFormData({...formData, dateOfBirth: date})}
            />
            {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
          </div>

          <div className="form-section">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div>
            <div>
              <p>Where did you hear about this event?</p>
              <div>
                <div className="form-section-radio">
                  <label htmlFor="socialMedia">Social Media</label>
                  <input 
                    type="radio" 
                    name="whereHeard" 
                    value="Social Media" 
                    id="socialMedia" 
                    checked={formData.whereHeard === "Social Media"}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-section-radio">
                  <label htmlFor="friends">Friends</label>
                  <input 
                    type="radio" 
                    name="whereHeard" 
                    value="Friends" 
                    id="friends" 
                    checked={formData.whereHeard === "Friends"}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-section-radio">
                  <label htmlFor="foundMyself">Found Myself</label>
                  <input 
                    type="radio" 
                    name="whereHeard" 
                    value="Found Myself" 
                    id="foundMyself" 
                    checked={formData.whereHeard === "Found Myself"}
                    onChange={handleChange}
                  />
                </div>  

                <div className="form-section-radio">
                  <label htmlFor="other">Other</label>
                  <input 
                    type="radio" 
                    name="whereHeard" 
                    value="Other" 
                    id="other" 
                    checked={formData.whereHeard === "Other"}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {errors.whereHeard && <p className="error">{errors.whereHeard}</p>}
          </div>

          <button onClick={handleSubmit} className="form-submit">Submit</button>
        </div>

        <div className="button-container">
          <Link to='/events' className="link-button">Back</Link>
        </div>
      </div>
    </div>
  )
};
