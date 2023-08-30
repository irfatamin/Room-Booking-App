import React from 'react'

function Error({message}){
    console.log(message);
    return (
        <div>
            <div class="alert alert-danger" role="alert">
                {/* {message.message} */}
                {message && <h1>Check console</h1>}
                Error!!!!!!!
            </div>
        </div>
    )
}

export default Error