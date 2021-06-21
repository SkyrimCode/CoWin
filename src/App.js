import React, { useState } from 'react';
import SearchByPIN from './SearchByPIN';
const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin"


function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(null);

  const search = evt => {
    console.log(query)
    if ( evt.key === "Enter") {
      if(query)
      {
        const date = new Date();
        const today = `${date.getDate()}-${(date.getMonth()+1).toString().padStart(2,0)}-${date.getUTCFullYear()}`

        fetch(url+`?pincode=${query}&date=${today}`)
        .then(res => res.json())
        .then(result => {
          let res = result.sessions?result.sessions.filter(item => item.available_capacity>0):[];
          setItems(res)
          setQuery(''); 
        });
      }
      else 
        setItems([])
    }   
      
    
  }


  return (
    <div className='app'>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter PIN Code..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <SearchByPIN items={items}/>
      </main>
    </div>
  );
}

export default App;
