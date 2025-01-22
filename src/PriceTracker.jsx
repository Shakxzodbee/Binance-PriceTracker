// src/components/PriceTracker.js

import React, { useState, useEffect } from 'react';
import { fetchCryptoData } from './services/cryptoService';  // Crypto ma'lumotlarini olish servisi
import { formatVolumeAndMarketCap } from '  ./services/formatService';  // Volume va Market Capni formatlash
import { formatPrice } from './services/priceFormatter';  // Narxlarni formatlash

const PriceTracker = () => {
  const selectedCryptos = [
    'BTCUSDT',
    'ETHUSDT',
    'XRPUSDT',
    'USDT',       // Faqat USDT
    'SOLUSDT',
    'BNBUSDT',
    'DOGEUSDT',
    'USDCUSDT',
    'ADAUSDT',
    'TRXUSDT',
  ];

  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoData(selectedCryptos);
      if (data) {
        setCryptoData(data);
        setLoading(false);
      } else {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    getData();
    const interval = setInterval(getData, 30000); // 30 sekundda yangilash
    return () => clearInterval(interval); // Component unmount bo'lganda intervalni to'xtatish
  }, []); 

  const handleClick = (cryptoSymbol) => {
    const telegramLink = `https://t.me/coinbase_cryptobot?start=${cryptoSymbol}`;
    window.location.href = telegramLink;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Binance Price Tracker</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {cryptoData.map((crypto) => {
          let iconName = crypto.symbol.replace('USDT', '').toLowerCase();
          if (crypto.symbol === 'USDT') {
            iconName = 'tether';
          }
          const imageUrl = `https://cryptologos.cc/logos/${iconName}-logo.png`;

          return (
            <div 
              key={crypto.symbol} 
              style={{ padding: '10px', margin: '10px', border: '1px solid #ddd', width: '250px', cursor: 'pointer' }}
              onClick={() => handleClick(crypto.symbol)}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={imageUrl}
                  alt={crypto.symbol}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/30'}
                  style={{ width: '30px', height: '30px', marginRight: '10px' }}
                />
                <h3>{crypto.symbol.replace('USDT', '')}</h3>
              </div>
              <p><strong>Price:</strong> ${formatPrice(parseFloat(crypto.lastPrice))}</p> {/* Narxni formatlash */}
              <p><strong>Change (24h):</strong> {parseFloat(crypto.priceChangePercent).toFixed(2)}%</p>
              <p><strong>24h Volume:</strong> {formatVolumeAndMarketCap(crypto.volume)}</p>
              <p><strong>Market Cap:</strong> {formatVolumeAndMarketCap(crypto.marketCap)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceTracker;
