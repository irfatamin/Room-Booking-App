import React from 'react'
import { Link } from 'react-router-dom'
function Landingscreen(){
    return(
        <div className='row landing'>
            <div className='col-md-12 text-center'>
                  <h2 style={{color:'white',fontsize:'130px'}}>Roomie</h2>
                  <h1 style={{color:'white'}}>"there is only one boss,The Guest"</h1>
                  
                  <link to='/home'>
                  <button className='btn' style={{color:'black',backgroundColor:'white'}}>Get Started</button>
                  </link>
            </div>
        </div>
    )
}

export default Landingscreen