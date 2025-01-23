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
      <h2>Binance Price Tracker</h2>

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
