import React,{useState} from 'react'
import {MdExpandMore,MdExpandLess} from 'react-icons/md'
import Accordion from './Accordion'

function Center(props) {
    const [clicked,setClicked] = useState(false)
    const toggle = index => {
        if(clicked === index)   
            return setClicked(null)
        setClicked(index)
    }
    let index=props.index
    let from = new Date('1970-01-01T' + props.item.from + 'Z').toLocaleTimeString({},{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'});
    let to= new Date('1970-01-01T' + props.item.to + 'Z').toLocaleTimeString({},{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'});

   return (
            <div>
                <Accordion>
                    <div className='accor' onClick={()=>toggle(index)}>
                        <div className='tab'>
                            <div className='impFont'>{props.item.name}</div>
                            <div className='slots'>Slots: {props.item.available_capacity}</div>
                            <span>{clicked===index?<MdExpandLess/>:<MdExpandMore/>}</span>
                        </div>
                        <div className='expand'>
                            <div><strong>Address: </strong>{props.item.address}</div>
                            <div><strong>Timing: </strong>{from}-{to}</div>
                            <div><strong>Vaccine: </strong>{props.item.vaccine}</div>
                            <div><strong>Price: </strong>&#8377;{props.item.fee}</div>
                            <div><strong>Dose 1: </strong>{props.item.available_capacity_dose1}</div>
                            <div><strong>Dose 2: </strong>{props.item.available_capacity_dose2}</div>
                        </div>
                    </div>
                </Accordion>
            </div>
        )
}

export default Center
