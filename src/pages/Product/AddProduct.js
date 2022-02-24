import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddProduct() {

  const history = useHistory();
  const token = localStorage.getItem("token");
  const [productInput, setProduct] = useState({
    name: '',
    description: '',
    sku: '',
    stock: '',
    price: '',
    primaryImage: ''
  });

  const handleInput = (e) => {
    e.persist();
    setProduct({ ...productInput, [e.target.name]: e.target.value })
  }

  const storeProduct = (e) => {
    e.preventDefault();

    const data = {
      name: productInput.name,
      description: productInput.description,
      sku: productInput.sku,
      stock: productInput.stock,
      price: productInput.price,
      primaryImage: productInput.primaryImage
    }

    axios.post(`products`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {

      if (res.data.status === 200) {
        swal("Success!", res.data.message, "success");
        setProduct({
          name: '',
          description: '',
          sku: '',
          stock: '',
          price: '',
          primaryImage: ''
        });
        history.push('/products');
      }
      else if (res.data.status === 422) {
        setProduct({ ...productInput, error_list: res.data.validate_err });
      }
    });
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Add Product
                  <Link to={'/products'} className="btn btn-primary btn-sm float-end"> Back</Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={storeProduct}>
                  <div className="row">

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Product Name</label>
                        <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
                        <span className="text-danger"></span>
                      </div>
                      <div className="form-group mb-3">
                        <label>Product Description</label>
                        <input type="text" name="description" onChange={handleInput} value={productInput.description} className="form-control" />
                        <span className="text-danger"></span>
                      </div>
                      <div className="form-group mb-3">
                        <label>Product SKU</label>
                        <input type="text" name="sku" onChange={handleInput} value={productInput.sku} className="form-control" />
                        <span className="text-danger"></span>
                      </div>
                    </div>
                    <div className="col-md-6">

                      <div className="form-group mb-3">
                        <label>Image</label>
                        <input type="text" name="primaryImage" onChange={handleInput} value={productInput.primaryImage} className="form-control" />
                        <span className="text-danger"></span>
                      </div>
                      <div className="form-group mb-3">
                        <label>Stock</label>
                        <input type="number" name="stock" onChange={handleInput} value={productInput.stock} className="form-control" />
                        <span className="text-danger"></span>
                      </div>
                      <div className="form-group mb-3">
                        <label>Price</label>
                        <input type="number" name="price" onChange={handleInput} value={productInput.price} className="form-control" />
                        <span className="text-danger"></span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">Save Product</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default AddProduct;