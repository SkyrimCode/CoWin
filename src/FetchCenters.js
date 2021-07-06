import React from 'react'
import styled from 'styled-components'
import Center from './Center';
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  `;
const CenterList = styled.div`
  padding: 8px;
  `;

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
