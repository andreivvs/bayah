import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyTable from './components/PropertyTable';

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/admin/properties')
      .then(res => setProperties(res.data));
  }, []);

  return (
    <div>
      <h2>Объекты недвижимости</h2>
      <PropertyTable properties={properties} />
    </div>
  );
}