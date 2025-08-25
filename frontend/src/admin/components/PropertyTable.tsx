import React from 'react';

export default function PropertyTable({ properties }: { properties: any[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Локация</th>
          <th>Комнат</th>
          <th>Площадь</th>
        </tr>
      </thead>
      <tbody>
        {properties.map(property => (
          <tr key={property.id}>
            <td>{property.id}</td>
            <td>{property.title}</td>
            <td>{property.location}</td>
            <td>{property.rooms}</td>
            <td>{property.area}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}