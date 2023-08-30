import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import baseUrl from '../utils/helper';
import { useNavigate } from 'react-router-dom';
function Loginscreen() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const navigate = useNavigate()

    async function Login() {
        const user = {
            email,
            password
        }
        // try {
        //     setloading(true);
        //     const result=await axios.post(`${baseUrl}/api/users/login`,user).data
        //     setloading(false)

            axios.post(`${baseUrl}/api/users/login`,user).then((res) => {
                const result = res.data
                localStorage.setItem('currentUser',JSON.stringify(result));
                navigate('/home')

            }).catch((err) => {
                console.log(error);
                setloading(false);
                seterror(true)
            })


            // window.location.href='/home'

            // } catch (error) {
            // }
            
    }
    return (
        <div>
            {loading &&(<Loader/>)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                     {error &&(<Error message='Invalid credentials'/>)}
                    <div className='bs'>
                        <h2>Login</h2>

                        <input type="text" className="form-control" placeholder="email" value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="text" className="form-control" placeholder="password" value={password} onChange={(e) => { setpassword(e.target.value) }} />

                        <button className='btn btn-primary mt-3' onClick={Login}>Login</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Loginscreen