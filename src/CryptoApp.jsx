import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CryptoApp.css'; 

const CryptoApp = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/list')
      .then(response => {
        setCoins(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Cryptocurrency Search</h1>
      <input
        type="text"
        placeholder="Search for a coin"
        onChange={handleChange}
      />
      <div className="coin-list">
        {filteredCoins.map(coin => (
          <div className="coin-card" key={coin.id}>
            <p className="coin-name">{coin.name}</p>
            <p className="coin-symbol">{coin.symbol}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoApp;
