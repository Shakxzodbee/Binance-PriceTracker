// src/services/cryptoService.js

export const fetchCryptoData = async (cryptos) => {
  try {
    
    const symbols = cryptos.map(symbol => `"${symbol}"`).join(',');
    const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=[${symbols}]`;

    
    const response = await fetch(url);

    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    
  }
};
