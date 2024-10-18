import React, { useState, useEffect } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';

const gf = new GiphyFetch('LLbIcVf5QqPMMyDcDstrLHvZqmpnnOHR'); // Substitua pela sua chave

const GifPicker = ({ onGifSelect }) => {
  const [gifs, setGifs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchGifs = async () => {
      const { data } = await gf.trending({ limit: 10 });
      setGifs(data);
    };
    fetchGifs();
  }, []);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim()) {
      const { data } = await gf.search(search, { limit: 10 });
      setGifs(data);
    }
  };

  return (
    <div className="gif-picker">
      <input 
        type="text" 
        placeholder="Search GIFs" 
        value={search}
        onChange={handleSearch} 
      />
      <div className="gif-grid">
        {gifs.map((gif) => (
          <img 
            key={gif.id} 
            src={gif.images.fixed_height.url} 
            alt={gif.title} 
            onClick={() => onGifSelect(gif.images.fixed_height.url)} 
          />
        ))}
      </div>
    </div>
  );
};

export default GifPicker;
