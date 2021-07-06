import React from 'react'
import Center from './Center';

function FetchCenters(props) {
    return (
        <div className="centerBody">
       { !props.items ? <></> : props.items.length ? (
        
            <ul>
                {props.items.map(item => (<Center key={item.session_id} item={item}/>))}
            </ul>
        
            ) : (<h3>Sorry! No slots available...</h3>)}
        </div>
    )
}

export default FetchCenters
