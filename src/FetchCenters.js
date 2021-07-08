import React from 'react'
import Center from './Center';


function FetchCenters(props) {
    return (
        <div id='centerid'>
       { !props.items ? <></> : props.items.length ? (
        <div className="centerBody">
            <ul>
                {props.items.map(item => (<Center key={item.session_id} item={item}/>))}
            </ul>
        </div>
            ) : (<h3 className='centerError'>Sorry! No slots available.</h3>)}
        </div>
    )
}

export default FetchCenters
