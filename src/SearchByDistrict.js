import React,{useState} from 'react';
import FetchCenters from './FetchCenters';
import DatePicker from 'react-datepicker';
import { GiLoveInjection } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai';

export default function SearchByDistrict(props) {
    const states=require('./assets/states.json');
    const url1='https://cdn-api.co-vin.in/api/v2/admin/location/districts/';
    const url2='https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict';

    const [state,setState] = useState('')
    const [districts, setDistricts] = useState([]);
    const [districtId, setDistrictId] = useState(null);
    const [items, setItems] = useState(null);
    const [selectedDate,setSelectedDate] = useState(null)
    const [stateError,setStateError] = useState('')
    const [districtError,setDistrictError] = useState('')
    const [dateError,setDateError] = useState('')

    const handleStateChange = (event) => {
        setState(event.target.value)
        setStateError('')
        fetch(url1+`${event.target.value}`)
            .then(res => res.json())
            .then(result => {
                setDistricts(result.districts);
            });
    }

    const handleDistrictChoice =(event) => {
        setDistrictId(event.target.value);
        setDistrictError('')
    }

    const handleDateChange = date => {
        setSelectedDate(date)
        setDateError('')
    }

    const retrieve = (e) => {
        e.preventDefault();
        if(state && districtId && selectedDate)
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
        if(!state)
            setStateError('State is not selected')
        if(!districtId)
            setDistrictError('District is not selected')
        if(!selectedDate)
            setDateError('Date is not selected')
    }

    return (
        
        <div>
            <div className="App">
                <form onSubmit={retrieve}>
                <div className='container'>
                    <p><label>Choose State: </label></p>
                    <select className='input' onChange={handleStateChange}>
                        {
                            states.map(state=>  <option key={state.state_id} value={state.state_id}>{state.state_name}</option>)
                        }
                    </select>
                    <p className='error'>{stateError}</p>
                </div>
                <div className='container'>
                <p><label>Choose District: </label></p>
                    <select className='input' onChange={handleDistrictChoice}>
                        {
                            districts.map(district=> <option key={district.district_id} value={district.district_id}>{district.district_name}</option>)
                        }
                    </select>
                    <p className='error'>{districtError}</p>
                </div>
            
                <div className='container'>
                    <p><label>Date:</label></p>
                    <DatePicker 
                    className='input'
                    placeholderText="Enter date..." 
                    selected={selectedDate} 
                    popperPlacement='right'
                    onChange={date => handleDateChange(date)} 
                    dateFormat='dd/MM/yyyy' 
                    minDate={new Date()} 
                    isClearable 
                    showYearDropdown 
                    scrollableMonthYearDropdown/>
                    <p className='error'>{dateError}</p>
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
