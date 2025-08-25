import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SwapTable from './components/SwapTable';

export default function SwapsPage() {
  const [swaps, setSwaps] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/admin/swaps/pending')
      .then(res => setSwaps(res.data));
  }, []);

  return (
    <div>
      <h2>Ожидающие обмены</h2>
      <SwapTable swaps={swaps} />
    </div>
  );
}