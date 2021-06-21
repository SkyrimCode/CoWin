import React, { Component } from 'react'
import styled from 'styled-components'
const Container = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  `;

export class Center extends Component {
    render() {
        return (
            <Container>
                <h3>{this.props.item.name}</h3>
                {this.props.item.address}<br/>
                Price: &#8377;{this.props.item.fee}<br/>
                Vaccine: {this.props.item.vaccine}<br/>
                Available Slots: {this.props.item.available_capacity}
            </Container>
        )
    }
}

export default Center
