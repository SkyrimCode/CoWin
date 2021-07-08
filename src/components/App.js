import React, { useState } from 'react';
import SearchByPIN from './SearchByPIN';
import Logo from './Logo';
import SearchByDistrict from './SearchByDistrict';
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
              <div style={{textAlign:'center'}}>
                <button className='button1 btn1' onClick={() => handleClick('1')}><span>Search By PIN</span></button>
              </div>
              <div style={{textAlign:'center'}}>
                <button className='button1 btn1' onClick={() => handleClick('2')}><span>Search By District</span></button>
                </div>
            </div>
        :<></>}
        {option==='1'?<SearchByPIN onChange={(val) => setOption(val)}/>:<></>}
        {option==='2'?<SearchByDistrict onChange={(val) => setOption(val)}/>:<></>}
    </div>
  );
}

export default App;
