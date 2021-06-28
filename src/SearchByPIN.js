import React, { useState } from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import FetchCenters from './FetchCenters';

const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin"

export default function SearchByPIN() {
    const [query, setQuery] = useState('');
    const [items, setItems] = useState(null);
    const [selectedDate,setSelectedDate] = useState(null)

    const search = () => {
        // console.log(query)
        if(query)
        {
            const date = selectedDate;
            const today = `${date.getDate()}-${(date.getMonth()+1).toString().padStart(2,0)}-${date.getUTCFullYear()}`

            fetch(url+`?pincode=${query}&date=${today}`)
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
                    onChange={e => setQuery(e.target.value)}
                    value={query}
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

                <div className='btn'><Button color="outline-primary" onClick={search}>Check Availability</Button>{' '}</div>
                <FetchCenters items={items}/>
            </main>
        </div>
    )
}
