import React, { useState } from 'react';
import SearchByPIN from './SearchByPIN';
import Logo from './Logo';
import SearchByDistrict from './SearchByDistrict';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [option,setOption] = useState('0');
  const handleClick = (val)=> {
      if(val!=='0')
        setOption(val);
      else
        setOption(0);
  }
  return (
    <div>
      <div className='logo'><Logo/></div>
      {option==='0'?
            <div className='center'>
              <div className='button-container-1'>
                <span class="mas">Search By PIN</span><button onClick={() => handleClick('1')}>Search By PIN</button>
              </div>
              <div className='button-container-1'>
                <span class="mas">Search By District</span><button onClick={() => handleClick('2')}>Search By District</button>
                </div>
            </div>
        :<></>}
        {option==='1'?<SearchByPIN onChange={(val) => setOption(val)}/>:<></>}
        {option==='2'?<SearchByDistrict onChange={(val) => setOption(val)}/>:<></>}
    </div>
  );
}

export default App;
