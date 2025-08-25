import React from 'react';

export default function CalendarEditor({ slots, onAddSlot, onRemoveSlot, onBlockHoliday }: any) {
  return (
    <div>
      <h3>Календарные слоты</h3>
      <button onClick={onAddSlot}>Добавить слот</button>
      <ul>
        {slots.map((slot: any) => (
          <li key={slot.id}>
            {slot.weekStart} - {slot.weekEnd} | 
            {slot.isPriority ? 'Праздник' : 'Обычный'} | 
            <button onClick={() => onRemoveSlot(slot.id)}>Удалить</button>
            <button onClick={() => onBlockHoliday(slot.id)}>Блокировать как праздник</button>
          </li>
        ))}
      </ul>
    </div>
  );
}