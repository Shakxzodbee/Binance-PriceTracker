// src/services/cryptoService.js

export const fetchCryptoData = async (cryptos) => {
  try {
    // Cryptolarni birlashtirib, Binance API'siga yuborish uchun kerakli formatga keltirish
    const symbols = cryptos.map(symbol => `"${symbol}"`).join(',');
    const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=[${symbols}]`;

    // Binance API'dan so'rov yuborish
    const response = await fetch(url);

    // So'rov muvaffaqiyatli bo'lganda javobni olish
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return null; // Xatolik yuz beradigan bo'lsa, null qaytadi
  }
};
