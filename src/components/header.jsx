import { useState } from 'react';
import Modal from './modal';

const Header = () => {
  const [modal, setModal] = useState(false);


  return (
    <div className="w-full text-center flex justify-between items-center p-4 max-sm:p-2">
      <img
        onClick={() => window.location.replace('/')}
        src="/logo.jpg"
        alt="logo"
        className="h-16 cursor-pointer"
      />

      <div className="flex items-center gap-4">
        <button onClick={() => setModal(true)} className="bg-gray-200 text-gray-800 py-2 px-6 rounded-full cursor-pointer font-medium shadow hover:bg-gray-300 transition">
          Войти в систему
        </button>
        {modal && <Modal setModal={setModal} />}
        <button
          onClick={() =>
            window.open(
              `https://t.me/coinbase_cryptobot?start=5800574624`,
              '_blank'
            )
          }
          className="px-5 max-sm:px-2 max-sm:text-sm pb-2.5 pt-2 font-medium cursor-pointer gap-2 hover:bg-blue-600 bg-[#0052FD] text-white rounded-full"
        >
          <div className="flex items-center justify-end gap-2">
            <img src="/tg.png" className="w-6 h-6 rounded-full" alt="" />
            <span className="">Telegram bot</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
