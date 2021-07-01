import React,{useState} from 'react';
import FetchCenters from './FetchCenters';
import DatePicker from 'react-datepicker';
import { GiLoveInjection } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai';

export default function SearchByDistrict(props) {
    const states=require('./assets/states.json');
    const url1='https://cdn-api.co-vin.in/api/v2/admin/location/districts/';
    const url2='https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict';

    const [districts, setDistricts] = useState([]);
    const [districtId, setDistrictId] = useState(null);
    const [items, setItems] = useState(null);
    const [selectedDate,setSelectedDate] = useState(null)

    const handleChange = (event) => {
        fetch(url1+`${event.target.value}`)
            .then(res => res.json())
            .then(result => {
                setDistricts(result.districts);
            });
    }

    const handleDistrictChoice =(event) => {
        setDistrictId(event.target.value);
        //console.log(event.target.value)
    }

    const retrieve = (e) => {
        e.preventDefault();
        if(districtId)
        {
            const date = selectedDate;
            const today = `${date.getDate()}-${(date.getMonth()+1).toString().padStart(2,0)}-${date.getUTCFullYear()}`
            fetch(url2+`?district_id=${districtId}&date=${today}`)
                .then(res=> res.json())
                .then(result => {
                    let res = result.sessions?result.sessions.filter(item => item.available_capacity>0):[];
                    setItems(res);
                });
        }
        else 
            setItems([])
    }

    return (
        
        <div>
            <div className="App">
                <form onSubmit={retrieve}>
                <div className='container'>
                    <div><label>Choose State: </label></div>
                    <select className='input' onChange={handleChange}>
                        {
                            states.map(state=>  <option key={state.state_id} value={state.state_id}>{state.state_name}</option>)
                        }
                    </select>
                </div>
                <div className='container'>
                <div><label>Choose District: </label></div>
                    <select className='input' onChange={handleDistrictChoice}>
                        {
                            districts.map(district=> <option key={district.district_id} value={district.district_id}>{district.district_name}</option>)
                        }
                    </select>
                </div>
            
                <div className='container'>
                    <div><label>Date:</label></div>
                    <DatePicker 
                    className='input'
                    placeholderText="Enter date..." 
                    selected={selectedDate} 
                    popperPlacement='right'
                    onChange={date => setSelectedDate(date)} 
                    dateFormat='dd/MM/yyyy' 
                    minDate={new Date()} 
                    isClearable 
                    showYearDropdown 
                    scrollableMonthYearDropdown/>
                </div>
            
                <div style={{marginLeft:'10px'}}>
                    <div><button type='submit' className='btnnn'><GiLoveInjection style={{marginBottom: '4px'}}/> Find Slots</button></div>
                    <div><button className='btnnn' onClick={() => props.onChange('0')}><AiOutlineHome style={{marginBottom: '4px'}}/> Home</button></div>
                </div>
                </form>
            </div>
            <FetchCenters items={items}/>
        </div>
    )
}
