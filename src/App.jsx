import { useEffect, useState } from 'react';
import InputBox from './Components/InputBox';
import image from './assets/background.jpeg';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  //Custom useCurrencyInfo hook
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);
  
    // Calculate amount function
   const calculateAmount = () => {
      setConvertedAmount(amount * currencyInfo[to]);
   };

   // useEffect to trigger calculation when from, to, or amount changes
   useEffect(() => {
      calculateAmount();
   }, [from, to, amount, currencyInfo]);

   // HandleSwap to swap the current 'from' and 'to' currency and the amount
  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat px-4"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-lg mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculateAmount();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                onChange={(e) => setAmount(e.target.value)}
                label="From"
                amount={amount}
                currencyOptions={options}
                selectCurrency={from}
                onCurrencyChange={(currency) => setFrom(currency)}
              />
            </div>
            <div className="relative w-full h-0.5">
            <button
               type="button"
               className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-gray-100 rounded-md bg-yellow-500 hover:bg-yellow-400 text-white px-2 py-0.5"
               onClick={handleSwap}
            >
               Swap
            </button>

            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                selectCurrency={to}
                onCurrencyChange={(currency) => setTo(currency)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0a2858] hover:bg-blue-900 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
