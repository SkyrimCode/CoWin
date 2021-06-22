import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  `;

function Center(props) {
   return (
            <Container>
                <h3>{props.item.name}</h3>
                {props.item.address}<br/>
                Price: &#8377;{props.item.fee}<br/>
                Vaccine: {props.item.vaccine}<br/>
                Available Slots: {props.item.available_capacity}
            </Container>
        )
}

export default Center
