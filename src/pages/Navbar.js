import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Navbar ()
{
  const history = useHistory();
  const token = localStorage.getItem("token");

  const logoutHanlder = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.post('logout')
      .then(() => {
        localStorage.removeItem("token");
        history.push('/login');
      });
  };
  return(
    <div className="pb-5">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Navbar</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-products">Add Product</Link>
              </li>
              <li className="nav-item">
                <a href="#" onClick={logoutHanlder} className="nav-link">LOGOUT</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;