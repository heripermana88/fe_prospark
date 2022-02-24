import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import './Product.css';


function Product() {
  const [user, setUser] = useState({});
  const history = useHistory();
  const token = localStorage.getItem("token");

  const fetchData = async () => {

    await axios.get('user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setUser(response.data);
      })
  }

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchInput, setQuery] = useState({
    search: '',
    page: '',
    perPage: '',
    by: '',
    sort: ''
  });
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      history.push('/login');
    }

    fetchData();
    refreshProduct();
  }, []);

  const refreshProduct = async (query) => {
    let urlQuely = '/products';
    if ((typeof query) == 'object') {
      urlQuely = urlQuely + `?search=${query.search}`;
    }
    await axios.get(urlQuely, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      if (res.status === 200) {
        if (typeof res.data.results.data == 'object') {
          setProducts(res.data.results.data);
        } else {
          setProducts(res.data.results);
        }
        setLoading(false);
      } else if (res.status === 401) {
        localStorage.removeItem("token");
        history.push('/login');
      }
    });
  }

  const handleSearch = (e) => {
    e.persist();
    searchInput.search = e.target.value;
    setQuery({ ...searchInput, [e.target.name]: e.target.value });
    refreshProduct(searchInput);
  }

  const deleteProduct = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      if (res.data.code === 200) {
        swal("Deleted!", res.data.message, "success");
        thisClicked.closest("tr").remove();
      }
      else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        thisClicked.innerText = "Delete";
      }
    });
  }

  if (loading) {
    return <h4>Loading Product Data...</h4>
  }
  else {
    var PRODUCT_HTMLTABLE = "";

    PRODUCT_HTMLTABLE = products.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>
            <img className='imgThumb' src={item.primaryImage} alt={item.name} />
          </td>
          <td>{item.sku}</td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.stock}</td>
          <td>{item.price}</td>
          <td>
            <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
          </td>
          <td>
            <button type="button" onClick={(e) => deleteProduct(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Products Data
                  <Link to={'add-products'} className="btn btn-primary btn-sm float-end"> Add Product</Link>
                </h4>
                <input type="text" name="search" placeholder='search...' onChange={handleSearch} value={searchInput.search} className="form-control" />
              </div>
              <div className="card-body">

                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>SKU</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>stock</th>
                      <th>Price</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRODUCT_HTMLTABLE}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Product;