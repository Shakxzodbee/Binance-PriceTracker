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
    <div className="">
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

      <div
        onClick={() => window.open('https://t.me/CoinbaseSupp_bot', '_blank')}
        className="fixed bottom-5  right-5 p-2 cursor-pointer bg-yellow-500 rounded-md"
      >
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 28 29"
            className="chat-icon"
            style={{ width: '28px' }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.5023 20.4105V14.5771C24.5023 14.2147 24.4839 13.8566 24.4481 13.5036C24.4449 13.4725 24.4416 13.4415 24.4382 13.4105C23.8579 8.16054 19.4069 4.07715 14.0023 4.07715C8.2033 4.07715 3.50229 8.77816 3.50229 14.5771V20.4105H9.33562V13.4105H6.50814C7.06932 9.77621 10.2109 6.99381 14.0023 6.99381C17.7937 6.99381 20.9353 9.77621 21.4964 13.4105H18.669V20.4105H19.7178C18.6728 21.4345 17.3539 22.1799 15.8812 22.5266C15.4563 21.9507 14.7729 21.5771 14.0023 21.5771C12.7136 21.5771 11.669 22.6218 11.669 23.9105C11.669 25.1991 12.7136 26.2438 14.0023 26.2438C14.9526 26.2438 15.7702 25.6757 16.134 24.8606C18.8766 24.295 21.2285 22.6599 22.7342 20.4105H24.5023Z"
              fill="#202630"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default App;
