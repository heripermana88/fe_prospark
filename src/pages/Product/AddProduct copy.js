import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class AddProduct extends Component {
  state = {
    name: '',
    description: '',
    sku: '',
    stock: '',
    price: '',
    primaryImage: 'image'

  }
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  storeProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await axios.post('products', this.state, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(res => {
      if (res.status === 200) {
        swal("Deleted!", res.data.message, "success");
        thisClicked.closest("tr").remove();
        useHistory().push('/product');
      }
    });
  }
  render() {
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
                  <form onSubmit={this.storeProduct}>
                    <div className="row">

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Product Name</label>
                          <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" />
                          <span className="text-danger"></span>
                        </div>
                        <div className="form-group mb-3">
                          <label>Product Description</label>
                          <input type="text" name="description" onChange={this.handleInput} value={this.state.description} className="form-control" />
                          <span className="text-danger"></span>
                        </div>
                        <div className="form-group mb-3">
                          <label>Product SKU</label>
                          <input type="text" name="sku" onChange={this.handleInput} value={this.state.sku} className="form-control" />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-6">

                        <div className="form-group mb-3">
                          <label>Image</label>
                          <input type="text" name="primaryImage" onChange={this.handleInput} value={this.state.primaryImage} className="form-control" />
                          <span className="text-danger"></span>
                        </div>
                        <div className="form-group mb-3">
                          <label>Stock</label>
                          <input type="number" name="stock" onChange={this.handleInput} value={this.state.stock} className="form-control" />
                          <span className="text-danger"></span>
                        </div>
                        <div className="form-group mb-3">
                          <label>Price</label>
                          <input type="number" name="price" onChange={this.handleInput} value={this.state.price} className="form-control" />
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
    )
  }
}

export default AddProduct;