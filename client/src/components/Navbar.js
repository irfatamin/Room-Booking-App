import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const navigate=useNavigate();

  function logout() {
    localStorage.removeItem('currentUser')
    // window.location.href = '/login'
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/home">Roomie</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" ><i class="fa-solid fa-bars" style={{ color: 'white' }}></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav .ml-auto mr-5">
            {user ? (
              <>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-user"></i>{user.name}
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/Profile">Profile</a></li>
                    <li><a class="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="/register">Register</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
