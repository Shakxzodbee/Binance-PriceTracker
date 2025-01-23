import axios from 'axios';
import { useEffect, useState } from 'react';

export default function TableData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedInterval, setSelectedInterval] = useState('24h');

  const photoCrypto = name => {
    switch (name) {
      case 'BTCUSDT':
        return 'BTCUSDT.png';
      case 'ETHUSDT':
        return 'ETHUSDT.png';
      case 'XRPUSDT':
        return 'XRPUSDT.png';
      case 'LTCUSDT':
        return 'LTCUSDT.png';
      case 'ADAUSDT':
        return 'ADAUSDT.png';
      case 'BNBUSDT':
        return 'BNBUSDT.png';
      case 'SOLUSDT':
        return 'SOLUSDT.png';
      case 'DOTUSDT':
        return 'DOTUSDT.png';
      case 'DOGEUSDT':
        return 'DOGEUSDT.png';
      case 'TRXUSDT':
        return 'TRXUSDT.png';
      default:
        return 'BTCUSDT.png';
    }
  };

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

  useEffect(() => {
    const fetchIntervalData = async interval => {
      try {
        const response = await axios(
          `https://api.binance.com/api/v3/ticker/${interval}r`
        );
        const filteredData = response.data.filter(item =>
          selectedCryptos.includes(item.symbol)
        );
        return filteredData;
      } catch (error) {
        console.error(`Error fetching ${interval} data:`, error);
        return [];
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [oneHourData, fourHourData, dayData] = await Promise.all([
          fetchIntervalData('1h'),
          fetchIntervalData('4h'),
          fetchIntervalData('24h'),
        ]);

        const combinedData = dayData.map(dayItem => {
          const oneHourItem = oneHourData.find(
            item => item.symbol === dayItem.symbol
          );
          const fourHourItem = fourHourData.find(
            item => item.symbol === dayItem.symbol
          );

          return {
            symbol: dayItem.symbol,
            lastPrice: dayItem.lastPrice,
            priceChanges: {
              '1h': oneHourItem?.priceChangePercent || '0',
              '4h': fourHourItem?.priceChangePercent || '0',
              '24h': dayItem.priceChangePercent,
            },
            volume: dayItem.volume,
            quoteVolume: dayItem.quoteVolume,
          };
        });

        setData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    const interval = setInterval(fetchAllData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = field => {
    setSortField(field);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const formatNumber = (num, decimals = 2) => {
    const n = Number.parseFloat(num);
    if (n >= 1e9) return (n / 1e9).toFixed(decimals) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(decimals) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(decimals) + 'K';
    return n.toFixed(decimals);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-200 p-4">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="text-sm text-gray-400 border-b border-gray-800">
              <th
                className="px-4 py-3 text-left cursor-pointer hover:text-white"
                onClick={() => handleSort('symbol')}
              >
                Name{' '}
                {sortField === 'symbol' &&
                  (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-right cursor-pointer hover:text-white"
                onClick={() => handleSort('lastPrice')}
              >
                Price{' '}
                {sortField === 'lastPrice' &&
                  (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-right">
                <div className="inline-flex items-center gap-2">
                  <div className="relative">
                    <button
                      className="bg-gray-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                      onClick={() =>
                        document
                          .getElementById('timeDropdown')
                          ?.classList.toggle('hidden')
                      }
                    >
                      {selectedInterval} <span className="text-xs">▼</span>
                    </button>
                    <div
                      id="timeDropdown"
                      className="hidden absolute top-full mt-1 bg-gray-800 rounded shadow-lg z-10"
                    >
                      {['1h', '4h', '24h'].map(interval => (
                        <button
                          key={interval}
                          className={`block w-full px-4 py-2 text-left hover:bg-gray-700 ${
                            selectedInterval === interval
                              ? 'text-yellow-500'
                              : ''
                          }`}
                          onClick={() => {
                            setSelectedInterval(interval);
                            document
                              .getElementById('timeDropdown')
                              ?.classList.add('hidden');
                          }}
                        >
                          {interval}
                        </button>
                      ))}
                    </div>
                  </div>
                  Change
                </div>
              </th>
              <th
                className="px-4 py-3 text-right cursor-pointer hover:text-white"
                onClick={() => handleSort('volume')}
              >
                24h Volume{' '}
                {sortField === 'volume' &&
                  (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-right cursor-pointer hover:text-white"
                onClick={() => handleSort('quoteVolume')}
              >
                Market Cap{' '}
                {sortField === 'quoteVolume' &&
                  (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="font-bold">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </div>
                </td>
              </tr>
            ) : (
              [...data]
                .sort((a, b) => {
                  if (!sortField) return 0;
                  const aValue =
                    sortField === 'symbol'
                      ? a[sortField]
                      : sortField === 'priceChangePercent'
                      ? Number.parseFloat(a.priceChanges[selectedInterval])
                      : Number.parseFloat(a[sortField]);
                  const bValue =
                    sortField === 'symbol'
                      ? b[sortField]
                      : sortField === 'priceChangePercent'
                      ? Number.parseFloat(b.priceChanges[selectedInterval])
                      : Number.parseFloat(b[sortField]);
                  return sortDirection === 'asc'
                    ? aValue > bValue
                      ? 1
                      : -1
                    : aValue < bValue
                    ? 1
                    : -1;
                })
                .slice(0, 10)
                .map((item, index) => (
                  <tr
                    key={item.symbol}
                    className={`border-b border-gray-800 hover:bg-gray-800/50 ${
                      index % 2 === 0 ? 'bg-gray-800/20' : ''
                    }`}
                  >
                    <td className="px-4 py-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <img
                          src={photoCrypto(item.symbol)}
                          className="rounded-full"
                          alt=""
                        />
                      </div>
                      <span>{item.symbol}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      ${Number.parseFloat(item.lastPrice).toFixed(6)}
                    </td>
                    <td
                      className={`px-4 py-4 text-right ${
                        Number.parseFloat(
                          item.priceChanges[selectedInterval]
                        ) >= 0
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      <div className="inline-flex flex-col items-end">
                        <span>
                          {Number.parseFloat(
                            item.priceChanges[selectedInterval]
                          ) >= 0
                            ? '+'
                            : ''}
                          {Number.parseFloat(
                            item.priceChanges[selectedInterval]
                          ).toFixed(2)}
                          %
                        </span>
                        {selectedInterval !== '24h' && (
                          <span className="text-sm opacity-75">
                            24h:{' '}
                            {Number.parseFloat(
                              item.priceChanges['24h']
                            ).toFixed(2)}
                            %
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      ${formatNumber(item.volume)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      ${formatNumber(item.quoteVolume)}
                    </td>
                    <td className="px-4 py-4 text-right space-x-2">
                      <button className="p-2 hover:bg-gray-700 rounded">
                        <svg
                          className="bn-svg h-5 w-5"
                          alt="Detail"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18 3H3v18h9.222A5.5 5.5 0 0118 11.97V3zM5.02 9.286L8.556 5.75l3.182 3.182 3.181-3.182 1.061 1.06-4.242 4.243-3.182-3.182-2.475 2.475-1.061-1.06zm12.544 9.278a2 2 0 10-2.828-2.828 2 2 0 002.828 2.828zm1.414-4.242a4.002 4.002 0 01.744 4.63l2.276 2.278-1.767 1.767-2.277-2.276a4.002 4.002 0 01-4.633-6.4 4 4 0 015.657 0z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-gray-700 rounded">
                        <svg
                          className="bn-svg h-5 w-5"
                          alt="Trade"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16 3h3v4h3v9.999h-3v4h-3v-4h-3V7h3V3zm3 7h-3v3.999h3V10z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M8 11h3v6H8v4H5v-4H2v-6h3V7h3v4z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
