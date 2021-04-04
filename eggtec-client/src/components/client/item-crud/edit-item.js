import React, { Component, useState, setState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const EditItem = (props) => {
    const [name, setname] = useState('');
    const [size, setsize] = useState('');
    const [amount, setamount] = useState('');

    const changeName = event => setname(event.target.value)

    const changeSize = event => setsize(event.target.value)

    const changeAmount = event => setamount(event.target.value)

    const onSubmit = (event) => {
        event.preventDefault();
        const item = {
            name, 
            size,
            amount
        };
        // unsure
        axios.put('http://localhost:4000/items' + props.match.params.id, item)
        .then(res => console.log(res.data));
        //this.props.history,push('/itemlist')
    }

    // need componentdidmount to get items from database
    // useEffect with []
    return (
        <div style={{ marginTop: 20 }}>
        <h3>Edit Item</h3>
        
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Name: </label>
                <input type="text"
                    className="form-control"
                    value={name}
                    onChange={changeName}
                />
            </div>
            <div className="form-group">
                <label>Size: </label>
                <input type="number"
                    className="form-control"
                    value={size}
                    onChange={changeSize}
                />
            </div>
            <div className="form-group">
                <label>Amount: </label>
                <input type="text"
                    className="form-control"
                    value={amount}
                    onChange={changeAmount}
                />
            </div>
          
            <div className="form-group">
                <input type="submit" value="Update Item" className="btn btn-primary" />
            
                <input
                    type="button" value="Cancel" className="btn btn-danger"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/itemlist';
                    }}
                /> 
            </div>
        </form>
       
    </div>
    )
}
export default EditItem;