import React, { Component } from 'react'
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


export class SearchByPIN extends Component {
    
    render() {
        return (
            <div>
           { !this.props.items ? <></> : this.props.items.length ? (
            <Container>
                <CenterList>
                    {this.props.items.map(item => (<Center key={item.session_id} item={item}/>))}
                </CenterList>
            </Container>
                ) : (<h3>Sorry! No slots available...</h3>)}
            </div>
        )
    }
    
}

export default SearchByPIN
