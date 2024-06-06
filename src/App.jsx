import React, { useState } from 'react';
import './App.css';
import search from './assets/icons/search.png';
import { useStateContext } from './context';
import BackgroundLayout from './Components/BackgroundLayout';
import WeatherCard from './Components/WeatherCard';
import MiniCard from './Components/MiniCard';

function App() {
  const [input, setInput] = useState('');
  const { weather, location, values, setPlace } = useStateContext();

  const handleSearch = () => {
    setPlace(input);
    setInput('');
  };

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
        <div className='relative'>
          <input 
            type="text" 
            className='focus:outline-none w-48 pl-10 pr-4 py-2 bg-white text-gray-800 placeholder-gray-400 shadow-lg' 
            placeholder="Search location"
            value={input} 
            onChange={e => setInput(e.target.value)} 
          />
          <img 
            src={search} 
            alt="search" 
            className="absolute left-3 top-3 h-6 w-6 cursor-pointer" 
            onClick={handleSearch} 
          />
        </div>
      </nav>
      <BackgroundLayout />
      <main className='w-full flex flex-col gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={location}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />
        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {values?.slice(1, 7).map(curr => (
            <MiniCard
              key={curr.datetime}
              time={curr.datetime}
              temp={curr.temp}
              iconString={curr.conditions}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;