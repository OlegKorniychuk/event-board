import { useEffect, useState, useRef } from 'react';
import { Event } from './Event';
import { fetchData } from '../utils/fetchData';
import { HomeHeader } from './HomeHeader';

export function HomePage() {
  const [hasMore, setHasMore] = useState(true);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('date');

  const elementRef = useRef(null);

  const onSortChange = (value) => {
    setPage(1);
    setEvents([]);
    setSort(value);

  }

  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchEvents()
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect();
      };
    };
  }, [events, sort])


  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchData(`/events/?page=${page}&sort=${sort}`);
      const newEvents = data.data.events;
      if (newEvents.length === 0) {
        setHasMore(false);
      } else {
        setEvents((prevEvents) => [...prevEvents, ...newEvents]);
        setPage((prevPage) => prevPage + 1);
      }
      
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err);
      setEvents(null);
    } finally {
      setLoading(false);
    }
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
    <div className='main-container'>
      <HomeHeader sortValue={sort} onSortChange={onSortChange}/>
      <div className='cards-container'>
        {
          events.map((event, index) => 
            <Event key={`${event._id}-${index}`} event={event}/>)
        }
        {hasMore && <div ref={elementRef} style={{textAlign:'center'}}>Loading...</div>}
      </div>
    </div>
  );
};
