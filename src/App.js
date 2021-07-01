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
                <Button color='outline-secondary' onClick={() => handleClick('1')}>Search By PIN</Button>
                <Button color='outline-secondary' style={{marginTop:'20px'}} onClick={() => handleClick('2')}>Search By District</Button>
            </div>
        :<></>}
        {option==='1'?<SearchByPIN onChange={(val) => setOption(val)}/>:<></>}
        {option==='2'?<SearchByDistrict onChange={(val) => setOption(val)}/>:<></>}
    </div>
  );
}

export default App;
