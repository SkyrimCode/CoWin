import React, { useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import FetchCenters from './FetchCenters';
import { AiOutlineHome } from 'react-icons/ai';
import { GiLoveInjection } from 'react-icons/gi';

const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin"

export default function SearchByPIN(props) {
    const [pin, setPin] = useState('');
    const [items, setItems] = useState(null);
    const [selectedDate,setSelectedDate] = useState(null)
    const [pinerror,setPinError] = useState('')
    const [invalidPin,setInvalidPin] = useState('')
    const [dateError,setDateError] = useState('')

    const handlePINChange = e => {
        let p = e.target.value;
        if(p)
        {
            setPin(p)
            setPinError('')
        }
        else
        {
            setPin('')
            setPinError('Pincode cannot be empty')
        }
        setInvalidPin('')
    }

    const handleDateChange = date => {
        setSelectedDate(date)
        setDateError('')
    }

    const search = (e) => {
        e.preventDefault();
        if(pin && selectedDate)
        {
            const date = selectedDate;
            const today = `${date.getDate()}-${(date.getMonth()+1).toString().padStart(2,0)}-${date.getUTCFullYear()}`

            fetch(url+`?pincode=${pin}&date=${today}`)
            .then(res => res.json())
            .then(result => {
            if(result.error){
                setInvalidPin(result.error);
                setItems(null)
            }
            else
            {
                let res = result.sessions?result.sessions.filter(item => item.available_capacity>0):[];
                setItems(res) 
            }
            });
        }
        if(!pin){
            setPinError('Pincode cannot be empty')
        }
        if(!selectedDate)
            setDateError('Date is not selected')

    }

    return (
        <div>
        <div className='App'>
            <form onSubmit={search}>
                <div>
                <p><label>Pincode:</label></p>
                <input 
                    className='input'
                    type="number"
                    name="PIN"
                    placeholder="Enter PIN Code..."
                    onChange={handlePINChange}
                    value={pin}
                />
                </div>
                {invalidPin?<p className='error'>{invalidPin}</p>:<></>}
                <p className='error'>{pinerror}</p>
                
                <div>
                <p><label>Date:</label></p>
                
                <DatePicker 
                placeholderText="Enter date..." 
                className='input'
                selected={selectedDate} 
                onChange={date => handleDateChange(date)} 
                dateFormat='dd/MM/yyyy' 
                withPortal
                minDate={new Date()} 
                isClearable 
                showYearDropdown 
                scrollableMonthYearDropdown/>
                
                </div>
                <p className='error'>{dateError}</p>

                <div>
                    <div><button type='submit' className='button btn2'><span><GiLoveInjection style={{marginBottom: '4px'}}/> Find Slots</span></button></div>
                    <div><button className='button btn2' onClick={() => props.onChange('0')}><span><AiOutlineHome style={{marginBottom: '4px'}}/> Home</span></button>{' '}</div>
                </div>
                
                
            </form>
            </div>
            <FetchCenters items={items}/>
        </div>
    )
}
