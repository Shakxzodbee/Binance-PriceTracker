import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PriceTracker = () => {
  // Tanlangan valyutalar ro'yxati (staik ro'yxat)
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

  // Ma'lumotlar holati
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API'dan ma'lumot olish
  const fetchCryptoData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
      // Tanlangan valyutalarni filtrlash
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

  // Pollingni yaratish
  useEffect(() => {
    // Ma'lumotlarni birinchi marta olish
    fetchCryptoData();
    
    // 30 soniyada bir marta yangilash
    const interval = setInterval(() => {
      fetchCryptoData();
    }, 30000); // 30 sekundda bir marta yangilash

    // Component unmount bo'lganda intervalni to'xtatish
    return () => clearInterval(interval);
  }, []); // Boshlang'ich ma'lumotni olish va intervalni boshlash

  // Hajm va Market Capni formatlash uchun funksiya (faqat B formatida)
  const formatVolumeAndMarketCap = (value) => {
    const num = parseFloat(value);
    if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(2)}B`;  // Har doim billion (B) formatida ko'rsatish
    } else if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(2)}M`;  // Agar million (M) dan katta bo'lsa million sifatida ko'rsatish
    } else {
      return `$${(num).toFixed(2)}`;  // Agar hajm million (M) yoki billion (B) dan kichik bo'lsa faqat son ko'rsatish
    }
  };

  // Market Capni hisoblash (har doim million sifatida ko'rsatish)
  const calculateMarketCap = (price, volume) => {
    const marketCap = parseFloat(price) * parseFloat(volume); // Narx va Hajmni ko'paytirish
    return formatVolumeAndMarketCap(marketCap); // Formatta million sifatida ko'rsatish
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