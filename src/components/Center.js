import React from 'react'

function Center(props) {
   return (
            <li>
                <div className='impFont'>{props.item.name}</div>
                <div>{props.item.address}</div>
                <div>Price: &#8377;{props.item.fee}</div>
                <div>Vaccine: {props.item.vaccine}</div>
                <div>Available Slots: {props.item.available_capacity}</div>
            </li>
        )
}

export default Center
