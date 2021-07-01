import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
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

    const search = (e) => {
        e.preventDefault();
        if(pin)
        {
            const date = selectedDate;
            console.log(date)
            const today = `${date.getDate()}-${(date.getMonth()+1).toString().padStart(2,0)}-${date.getUTCFullYear()}`

            fetch(url+`?pincode=${pin}&date=${today}`)
            .then(res => res.json())
            .then(result => {
            let res = result.sessions?result.sessions.filter(item => item.available_capacity>0):[];
            setItems(res) 
            });
        }
        else 
            setItems([])
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
                    onChange={e => setPin(e.target.value)}
                    value={pin}
                />
                </div>

                <div>
                <p><label>Date:</label></p>
                
                <DatePicker 
                placeholderText="Enter date..." 
                className='input'
                selected={selectedDate} 
                onChange={date => setSelectedDate(date)} 
                dateFormat='dd/MM/yyyy' 
                popperPlacement='right'
                minDate={new Date()} 
                isClearable 
                showYearDropdown 
                scrollableMonthYearDropdown/>
                
                </div>

                <div>
                    <div><button type='submit' className='btnnn'><GiLoveInjection style={{marginBottom: '4px'}}/> Find Slots</button></div>
                    <div><button className='btnnn' onClick={() => props.onChange('0')}><AiOutlineHome style={{marginBottom: '4px'}}/> Home</button>{' '}</div>
                </div>
                
                
            </form>
            </div>
            <FetchCenters items={items}/>
        </div>
    )
}
