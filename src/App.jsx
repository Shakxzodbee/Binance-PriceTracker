import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PriceTracker = () => {
  const selectedCryptos = [
    'BTCUSDT',
    'ETHUSDT',
    'XRPUSDT',
    'LTCUSDT',
    'ADAUSDT',
    'BNBUSDT',
    'SOLUSDT',
    'DOTUSDT',
    'DOGEUSDT',
    'TRXUSDT',
  ];

  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCryptoData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
      const filteredData = response.data.filter(item =>
        selectedCryptos.includes(item.symbol)
      );
      setCryptoData(filteredData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    
    const interval = setInterval(() => {
      fetchCryptoData();
    }, 30000);

    return () => clearInterval(interval);
  }, []); 
  
  const formatVolumeAndMarketCap = (value) => {
    const num = parseFloat(value);
    if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(2)}M`;
    } else {
      return `$${(num).toFixed(2)}`;  
    }
  };

  

  const calculateMarketCap = (price, volume) => {
    const marketCap = parseFloat(price) * parseFloat(volume); 
    return formatVolumeAndMarketCap(marketCap);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Binance Price Tracker</h2>

      {/* Narxlar ro'yxati */}
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {cryptoData.map((crypto) => (
          <div key={crypto.symbol} style={{ padding: '10px', margin: '10px', border: '1px solid #ddd', width: '250px' }}>
            <h3>{crypto.symbol}</h3>
            <p><strong>Price:</strong> ${parseFloat(crypto.lastPrice).toFixed(2)}</p>
            <p><strong>Change (24h):</strong> {parseFloat(crypto.priceChangePercent).toFixed(2)}%</p>
            <p><strong>24h Volume:</strong> {formatVolumeAndMarketCap(crypto.volume)}</p>
            <p><strong>Market Cap:</strong> {calculateMarketCap(crypto.lastPrice, crypto.volume)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTracker;