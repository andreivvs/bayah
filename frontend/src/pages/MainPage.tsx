import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MainPage() {
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/properties')
      .then(res => setProperty(res.data[0]));
  }, []);

  if (!property) return <div>Loading...</div>;

  return (
    <div>
      <h1>{property.title}</h1>
      <img src={property.gallery[0]} alt="Villa" style={{width: '100%'}} />
      <p>Локация: {property.location}</p>
      <p>Комнат: {property.rooms}, Площадь: {property.area} м2</p>
      <p>Контакт управляющего: {property.managerContact}</p>
      <button>Забронировать</button>
      <button>Обменять неделю</button>
    </div>
  );
}