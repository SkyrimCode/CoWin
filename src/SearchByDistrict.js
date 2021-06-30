import React,{useState} from 'react';
import FetchCenters from './FetchCenters';
import DatePicker from 'react-datepicker';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
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

    const retrieve = () => {
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
            <div style={{textAlign:'center'}}>
            <label>
            <div className='impText'>Choose State: </div>
                <select onChange={handleChange}>
                    {
                        states.map(state=>  <option key={state.state_id} value={state.state_id}>{state.state_name}</option>)
                    }
                </select>
            </label>
            <label style={{marginLeft:'30px'}}>
            <div className='impText'>Choose District: </div>
                <select onChange={handleDistrictChoice}>
                    {
                        districts.map(district=> <option key={district.district_id} value={district.district_id}>{district.district_name}</option>)
                    }
                </select>
            </label>
            
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
            </div>
            <div className='btn'>
                <Button color="outline-primary" onClick={retrieve}><GiLoveInjection style={{marginBottom: '4px'}}/> Check Availability</Button>{' '}
                <Button color="outline-primary" onClick={() => props.onChange('0')}><AiOutlineHome style={{marginBottom: '4px'}}/> Back To Home</Button>{' '}
            </div>
            
            <FetchCenters items={items}/>
        </div>
    )
}
