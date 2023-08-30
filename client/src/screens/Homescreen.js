import React, { useState, useEffect } from 'react'
import axios from "axios";
// import Navbar from '../components/Navbar';
import Room from '../components/Room';
import Loader from "../components/Loader"
import Error from "../components/Error"
//import 'antd/dist/antd.css';
import baseUrl from '../utils/helper';
import moment from 'moment';
import { DatePicker, Select, Space } from 'antd';
const { RangePicker } = DatePicker;
function Homescreen() {

    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fromdate, setfromdate] = useState("");
    const [todate, settodate] = useState("");
    const [duplicaterooms, setduplicaterooms] = useState([])
    const [searchkey, setsearchkey] = useState('')
    const [type, settype] = useState('all')
    useEffect(() => {
        // try {
        setLoading(true)
        axios.get(`${baseUrl}/api/rooms/getallrooms`).then((res) => {
            setduplicaterooms(res.data);
            setRooms(res.data);
            setLoading(false);
        }).catch((err) => {
            setError(err)
            setLoading(false)
        })

        // } catch (error) {
        //     seterror(error)
        //     console.log(error)
        //     setLoading(false)
        // }
    }, [])

    function filterByDate(dates) {
        setfromdate(moment(dates[0]).format('DD-MM-YYYY'))
        settodate(moment(dates[0]).format('DD-MM-YYYY'))
        console.log(moment(dates[0]).format('DD-MM-YYYY'));

        var temprooms = []
        var availability = false
        for (let room of duplicaterooms) {
            if (room.currentbookings.length > 0) {

                console.log(room)
                for (let booking of room.currentbookings) {
                    if (!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate) &&
                        !moment(moment(dates[1]).format('DD-MM-YYYY'))) {
                        if (
                            moment(dates[0]).format('DD-MM-YYYY') != booking.fromdate &&
                            moment(dates[0]).format('DD-MM-YYYY') != booking.todate &&
                            moment(dates[1]).format('DD-MM-YYYY') != booking.fromdate &&
                            moment(dates[0]).format('DD-MM-YYYY') != booking.todate
                        ) {
                            availability = true
                        }
                    }
                }

            }
            if (availability == true || room.currentbookings.length == 0) {
                temprooms.push(room)
            }
            setRooms(temprooms)
        }
    }
    function filterBySearch() {
        const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
        setRooms(temprooms)
    }

    function filterByType(e) {
        settype(e)

        if (e !== 'all') {
            const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() == e.toLowerCase())
            setRooms(temprooms)
        }
        else {
            setRooms(duplicaterooms)
        }
    }

    return (
        <div className='container'>

            <div className='row mt-5 bs'>
                <div className="col-md-3">
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                </div>
                <div className="col-md-5">
                    <input type='text' className='form-control' placeholder='search rooms'
                        value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBySearch}
                    />
                </div>
                <div className="col-md-3">
                    <select className='form-control' value={type} onChange={(e) => { filterByType(e.target.value) }}>
                        <option value="all">All</option>
                        <option value="delux">Delux</option>
                        <option vlaue="non-delux">Non-Delux</option>
                    </select>
                </div>
            </div>

            <div className="row justify-content-center mt-5">
                {loading ? (<Loader />) : rooms.map((room) => {
                    return (<div className="col-md-9 mt-3">
                        <Room room={room} fromdate={fromdate} todate={todate} />
                    </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Homescreen