import React, { useState } from 'react';
const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin"


function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(null);

  const search = evt => {
    console.log(query)
    if ( evt.key === "Enter") {
      if(query)
      {
        let res=[]
        const date = new Date();
      const today = `${date.getDate()}-${(date.getMonth()+1).toString().padStart(2,0)}-${date.getUTCFullYear()}`
      //console.log(today);
      fetch(url+`?pincode=${query}&date=${today}`)
        .then(res => res.json())
        .then(result => {
          //setItems(result.sessions.filter(a=>a.available_capacity_dose1!==0 || a.available_capacity_dose2!==0));
          res = result.sessions?result.sessions.filter(item => item.available_capacity>0):[];
          setItems(res)
          setQuery('');
          //console.log(result.sessions);
          //console.log("Item is = " + JSON.stringify(items));  
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
        { !items ? <></> : items.length ? (
        <div>
          {console.log(items)}
                   <ul>
                        {items.map(item => (
                            <li key={item.session_id}>
                                <strong>Name: </strong>{item.name}
                                <strong className='mLeft'>Address: </strong> {item.address} 
                                <strong className='mLeft'>Available Slots: </strong>{item.available_capacity}
                            </li>
                        ))}
                    </ul>
        </div>
        ) : (<div>Sorry! No slots available...</div>)}
      </main>
    </div>
  );
}

export default App;
