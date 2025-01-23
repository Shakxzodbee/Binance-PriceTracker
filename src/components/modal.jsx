import PropTypes from 'prop-types';
import { useRef } from 'react';

const Modal = ({ setModal }) => {
  const modalRef = useRef(null);

  const closeModal = e => {
    if (e.target === modalRef.current) setModal(false);
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed flex justify-center items-center z-[1002] inset-0 bg-opacity-30 backdrop-blur-sm  "
    >
      <div className="">
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg overflow-y-auto  h-screen shadow text-black p-6">
            <img
              src="/p.jpg"
              alt="Certificate"
              className="w-full h-96 object-contain mx-auto mb-6"
            />
            <div className="text-gray-800 text-left space-y-4">
              <p>
                <strong>🔹 Coinbase</strong> - онлайн-биржа, предоставляющая
                услуги торговли бинарными опционами и другими финансовыми
                инструментами.
              </p>
              <p>
                Важно понимать, что в любой финансовой сфере существуют риски,
                связанные с инвестированием и торговлей. Поэтому никакая биржа
                или компания не может дать полные гарантии прибыли или
                отсутствия рисков. Тем не менее, Coinbase может предоставить
                своим клиентам некоторые гарантии, чтобы обеспечить надежность и
                безопасность своих услуг.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  🔒 <strong>Безопасность средств клиентов:</strong> Coinbase
                  гарантирует сохранность средств клиентов на отдельных
                  банковских счетах, отделенных от собственных средств компании.
                </li>
                <li>
                  ⚙️ <strong>Безопасность транзакций:</strong> Coinbase
                  использует высокоэффективные системы шифрования и защиты
                  данных.
                </li>
                <li>
                  🌐 <strong>Прозрачность и открытость:</strong> Coinbase
                  предоставляет полную информацию о своих услугах.
                </li>
                <li>
                  🦹🏼‍♂️ <strong>Обучение и поддержка:</strong> Coinbase
                  предоставляет полную поддержку своим клиентам.
                </li>
                <li>
                  📲 <strong>Удобство и доступность:</strong> Coinbase
                  предоставляет удобную и простую платформу для торговли.
                </li>
              </ul>
              <p>
                ✅ <strong>Gembell Limited</strong> (компания, под руководством
                которой предоставляются услуги Coinbase) регулируется ЦРОФР
                (Номер лицензии TSRF RU 0395 AA Vv0209).
              </p>
              <p>
                Тем не менее, напоминаем, что никакая компания или биржа не
                может дать 100%-ю гарантию на инвестиции. Поэтому, перед тем как
                начать инвестировать, настоятельно рекомендуется ознакомиться с
                правилами и условиями биржи и тщательно изучить все возможные
                риски.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  setModal: PropTypes.func.isRequired,
};

export default Modal;
