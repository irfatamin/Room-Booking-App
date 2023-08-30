import React, { useState, useEffect } from 'react'
import axios from 'axios';
//import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Room from '../components/Room';
import baseUrl from '../utils/helper';

import StripeCheckout from 'react-stripe-checkout';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

function Bookingsscreen({ match }) {
    // const {roomid} = useParams();
    const [room, setrooms] = useState(null)
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const roomid = useParams().roomid
    const fromdate = moment(useParams().fromdate, 'DD-MM-YYYY')
    const todate = moment(useParams().todate, 'DD-MM-YYYY')
    console.log(roomid, fromdate, todate)


    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1
    const [totalamount, settotalamount] = useState(0)

    useEffect(() => {

        if (!localStorage.getItem('currentUser')) {
            // window.location.reload='/login'
            navigate('/login')
        }

        // try {
        setloading(true)
        //     const data = (await 
        axios.get(`${baseUrl}/api/rooms/getroombyid/${roomid}`).then((res) => {
            const data = res.data
            settotalamount(data.rentperday * totaldays)
            setrooms(data);
            setloading(false);
            console.log((data));
        }).catch((err) => {
            console.log(err)
            setloading(false);
            seterror(true)
            setErrorMessage(err)
        })
        //         ).data;
        // } catch (error) {
        // }
    }, [])
    async function bookRoom() {

    }

    async function onToken(token) {
        console.log(token);
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token
        }
        try {
            setloading(true)
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)
            setloading(false)
            Swal.fire('Congratulations,Your room booked successfully', 'success').then(result => {
                // window.location.href = '/bookings'
                navigate('/bookings')
            })
        } catch (error) {
            setloading(false)
            Swal.fire('Oops', 'Something went wrong', 'error')
        }
    }

    return (
        <div classname='m-5'>
            {loading ? (<Loader />) : room ? (
                <div>
                    <div className="row justify-content-center mt-5 bs">
                        <div className="col-md-5">
                            <h1>{room.name}</h1>
                            {room && <img src={room.imageurls[0]} className='bigimg' />}
                        </div>
                        <div className="col-md-5">
                            <div style={{ textAlign: 'right' }}>
                                <b>
                                    <h1>Booking Details</h1>
                                    <hr />
                                    <p>Name:{JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                    <p>From Date: {match.params.fromdate}</p>
                                    <p>To Date: {match.params.todate}</p>
                                    <p>Max Count:{room.maxcount}</p>
                                </b>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <b>
                                    <h1>Amount</h1>
                                    <hr />
                                    <p>Total Days : {totaldays}</p>
                                    <p>Rent per Day:{room.rentperday}</p>
                                    <p>Total Amount: {totalamount}</p>
                                </b>
                            </div>
                            <div style={{ float: 'right' }}>
                                <button className='btn btn-primary' onClick={bookRoom}>Pay Now</button>

                                <StripeCheckout
                                    amount={totalamount * 100}
                                    token={onToken}
                                    currency='INR'
                                    stripeKey="pk_test_51NhckjSJ0Kd0Dy2IV8otwh2ZWQ5o5D6kRqYqjQG9qNMLS278VWT3l5wecYxPGK8XuYab9v71G5gX1Obv9pESe25Q00frAYBImL">
                                    <button className="btn btn-primary" onClick>Pay Now{" "}</button>
                                </StripeCheckout>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Error message={errorMessage} />
            )}
        </div>
    )
}

export default Bookingsscreen