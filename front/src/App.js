import { HomePage } from './components/HomePage'
import { EventPage } from './components/EventPage'
import { RegisterPage } from './components/RegisterPage'
import { RegistrationStatusPage } from './components/RegistrationStatusPage'
import { PageNotFound } from './components/PageNotFound'
import { Chart } from './components/Chart'
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/events" replace />} />
      <Route path='events' element={<HomePage/>}/>
      <Route path='events/:eventId' element={<EventPage/>}/>
      <Route path='events/:eventId/register/' element={<RegisterPage/>}/>
      <Route path='events/:eventId/register/:status' element={<RegistrationStatusPage/>}/>
      <Route path="/test" element={<Chart/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  );
}

export default App;
