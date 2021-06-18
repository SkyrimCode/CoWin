import React, { useState } from 'react';
const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin"


function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(url+`?pincode=${query}&date=18-06-2021`)
        .then(res => res.json())
        .then(result => {
          setItems(result.sessions);
          setQuery('');
          //console.log(result.sessions);
          //console.log("Item is = " + JSON.stringify(items));  
        });
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
        {items.length ? (
        <div>
          {console.log(items)}
                   <ul>
                        {items.map(item => (
                            <li key={item.session_id}>
                                <strong>Name: </strong>{item.name}
                                <strong className='mLeft'>Address: </strong> {item.address} 
                            </li>
                        ))}
                    </ul>
        </div>
        ) : (<div>Nothing to display</div>)}
      </main>
    </div>
  );
}

export default App;
