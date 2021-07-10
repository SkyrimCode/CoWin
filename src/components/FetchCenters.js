import React from 'react'
import Center from './Center';
import {BsExclamationTriangleFill} from 'react-icons/bs';
import { IconContext } from 'react-icons/lib'

function FetchCenters(props) {
    const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
      };
    return (
        <div>
       { !props.items ? <></> : props.items.length ? (
        <div>
            <IconContext.Provider value={{color:'#00ffb9',size:'25px'}}>
            <div className='accordionSection'>
                
                    {props.items.map(item => (<Center key={item.session_id} item={item} index={item.session_id} />))}
                    <div style={{textAlign:'center'}}><button className='topbtn' onClick={scrollToTop}>Back to Top</button></div>
            </div>
            </IconContext.Provider>
        </div>
            ) : (<div className='occupyFull'><div><BsExclamationTriangleFill /></div><div><h3>Sorry! No slots available.</h3></div></div>)}
        </div>
    )
}

export default FetchCenters
