import React from 'react';

export default function SwapTable({ swaps }: { swaps: any[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>От кого</th>
          <th>Кому</th>
          <th>Неделя</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        {swaps.map(swap => (
          <tr key={swap.id}>
            <td>{swap.id}</td>
            <td>{swap.fromShareId}</td>
            <td>{swap.toShareId}</td>
            <td>{swap.week}</td>
            <td>{swap.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}