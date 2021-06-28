import React, { useState } from 'react';
import SearchByPIN from './SearchByPIN';
import Logo from './Logo';
import { Button } from 'reactstrap';
import SearchByDistrict from './SearchByDistrict';

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
      {option==='0'?<Button  onClick={() => handleClick('1')}>Search By PIN</Button>:<></>}
      {option==='0'?<Button  onClick={() => handleClick('2')}>Search By District</Button>:<></>}
      {option==='1'?<SearchByPIN/>:<></>}
      {option==='2'?<SearchByDistrict/>:<></>}
    </div>
  );
}

export default App;
