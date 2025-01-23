import TableData from './components/table-data';

const App = () => {
  // const selectedCryptos = [
  //   'BTCUSDT',
  //   'ETHUSDT',
  //   'XRPUSDT',
  //   'LTCUSDT',
  //   'ADAUSDT',
  //   'BNBUSDT',
  //   'SOLUSDT',
  //   'DOTUSDT',
  //   'DOGEUSDT',
  //   'TRXUSDT',
  // ];

  // const [cryptoData, setCryptoData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const fetchCryptoData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       'https://api.binance.com/api/v3/ticker/24hr'
  //     );
  //     const filteredData = response.data.filter(item =>
  //       selectedCryptos.includes(item.symbol)
  //     );
  //     setCryptoData(filteredData);
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err.message);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCryptoData();

  //   const interval = setInterval(() => {
  //     fetchCryptoData();
  //   }, 30000);

  //   return () => clearInterval(interval);
  // }, []);

  // // Format value with commas and decimals
  // const formatCurrency = value => {
  //   const number = parseFloat(value);
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'USD',
  //     minimumFractionDigits: 2,
  //     maximumFractionDigits: 2,
  //   }).format(number);
  // };

  // const formatVolumeAndMarketCap = value => {
  //   const num = parseFloat(value);
  //   return `${(num / 1e9).toFixed(2)}B`; // Always show in billions with "B"
  // };

  // const calculateMarketCap = (price, volume) => {
  //   const marketCap = parseFloat(price) * parseFloat(volume);
  //   return formatVolumeAndMarketCap(marketCap);
  // };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  // console.log(cryptoData);

  return (
    <div>
      <div className="w-full text-center flex justify-between items-center p-4 max-sm:p-2">
        <img src="/logo.jpg" alt="logo" className="h-16" />

        <div className="flex items-center gap-4">
          {/* <button className="bg-[#0052FD] font-medium cursor-pointer text-white pb-2 pt-1.5 px-6 rounded-full hover:bg-blue-700 transition">
            Регистрация
          </button> */}
          <button
            onClick={() =>
              window.open(
                `https://t.me/coinbase_cryptobot?start=5800574624`,
                '_blank'
              )
            }
            className="px-4 max-sm:px-2 max-sm:text-sm pb-2 pt-1.5 font-medium cursor-pointer gap-2 hover:bg-blue-600 bg-[#0052FD] text-white rounded-full"
          >
            <div className="flex items-center justify-end gap-2">
              <img src="/tg.png" className="w-6 h-6 rounded-full" alt="" />
              <span className="">Telegram bot</span>
            </div>
          </button>
        </div>
      </div>

      {/* Narxlar ro'yxati */}
      {/* <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {cryptoData.map(crypto => (
          <div
            key={crypto.symbol}
            style={{
              padding: '10px',
              margin: '10px',
              border: '1px solid #ddd',
              width: '250px',
            }}
          >
            <h3>{crypto.symbol}</h3>
            <p>
              <strong>Price:</strong> {formatCurrency(crypto.lastPrice)}
            </p>
            <p>
              <strong>Change (24h):</strong>{' '}
              {parseFloat(crypto.priceChangePercent).toFixed(2)}%
            </p>
            <p>
              <strong>24h Volume:</strong>{' '}
              {formatVolumeAndMarketCap(crypto.volume)}
            </p>
            <p>
              <strong>Market Cap:</strong>{' '}
              {calculateMarketCap(crypto.lastPrice, crypto.volume)}
            </p>
          </div>
        ))}
      </div> */}

      <TableData />
    </div>
  );
};

export default App;
