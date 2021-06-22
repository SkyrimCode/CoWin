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

function SearchByPIN(props) {
    return (
        <div>
       { !props.items ? <></> : props.items.length ? (
        <Container>
            <CenterList>
                {props.items.map(item => (<Center key={item.session_id} item={item}/>))}
            </CenterList>
        </Container>
            ) : (<h3>Sorry! No slots available...</h3>)}
        </div>
    )
}

export default SearchByPIN
