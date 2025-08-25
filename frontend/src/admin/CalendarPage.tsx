import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CalendarEditor from './components/CalendarEditor';

export default function CalendarPage() {
  const [slots, setSlots] = useState([]);
  const propertyId = 1; // пример

  useEffect(() => {
    axios.get(`http://localhost:4000/admin/calendar/${propertyId}`)
      .then(res => setSlots(res.data));
  }, [propertyId]);

  const onAddSlot = () => { /* ... */ };
  const onRemoveSlot = (id: number) => { /* ... */ };
  const onBlockHoliday = (id: number) => { /* ... */ };

  return (
    <div>
      <h2>Редактирование календаря</h2>
      <CalendarEditor slots={slots} onAddSlot={onAddSlot} onRemoveSlot={onRemoveSlot} onBlockHoliday={onBlockHoliday} />
    </div>
  );
}