import React, { useState } from 'react';
import { Button } from 'reactstrap';
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

    const search = () => {
        // console.log(pin)
        if(pin)
        {
            const date = selectedDate;
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
            <main>
                <div className="search-box">
                <div className='impText'>Pincode:{' '}</div>
                <input 
                    type="text"
                    className="search-bar"
                    placeholder="Enter PIN Code..."
                    onChange={e => setPin(e.target.value)}
                    value={pin}
                />
                </div>

                <div className='datepicker'>
                <div className='impText'>Date:{' '}</div>
                <DatePicker placeholderText="Enter date..." 
                selected={selectedDate} 
                onChange={date => setSelectedDate(date)} 
                dateFormat='dd/MM/yyyy' 
                minDate={new Date()} 
                isClearable 
                showYearDropdown 
                scrollableMonthYearDropdown/>
                </div>

                <div className='btn '>
                    <Button color="outline-primary" onClick={search}><GiLoveInjection style={{marginBottom: '4px'}}/> Check Availability</Button>{' '}
                    <Button color="outline-primary" onClick={() => props.onChange('0')}><AiOutlineHome style={{marginBottom: '4px'}}/> Back To Home</Button>{' '}
                </div>
                
                <FetchCenters items={items}/>
            </main>
        </div>
    )
}
