import React, { Componen, useState, setState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const CreateTrailer = (props) => {
    const [trailerName, settrailerName] = useState('');
    const [trailerInfo, settrailerInfo] = useState('');
    const [trailerStatus, settrailerStatus] = useState('');
    const [trailerCheckedOut, settrailerCheckedOut] = useState('');
    const [state, setState] = useState('');
    

    const changeTrailerName = event => settrailerName(event.target.value)

    const changeTrailerInfo = event => settrailerInfo(event.target.value)

    const changetrailerStatus = event => settrailerStatus(event.target.value)

    const changetrailerCheckedOut = event => settrailerCheckedOut(event.target.value)

    const onSubmit = event => {
        event.preventDefault()
        // make new item
        const newTrailer = {
            trailerName,
            trailerInfo, 
            trailerStatus,
            trailerCheckedOut
        }

        // send to server
        axios.post('http://localhost:4000/trailer', newTrailer)
        .then(res => console.log(res.data))

        // clear state? 
        setState({
            trailerName: '',
            trailerInfo: '',
            trailerStatus: '',
            trailerCheckedOut: ''
        })
    }


    return (
    < Modal show={props.show} onHide={props.onClose} >
        < Modal.Header closeButton>
            <Modal.Title>Add Trailer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='container form-div d-flex justify-content-center'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Trailer Name: </label>
                        <input type="text"
                            className="form-control"
                            value={trailerName}
                            onChange={changeTrailerName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trailer Info: </label>
                        <input type="text"
                            className="form-control"
                            value={trailerInfo}
                            onChange={changeTrailerInfo}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <input type="text"
                            className="form-control"
                            value={trailerStatus}
                            onChange={changetrailerStatus}
                        />
                    </div>
                    <div className="form-group">
                        <label>Checked Out: </label>
                        <input type="text"
                            className="form-control"
                            value={trailerCheckedOut}
                            onChange={changetrailerCheckedOut}
                        />
                    </div>
                  
                    <div className="form-group">
                        <input type="submit" value="Create Trailer" className="btn btn-primary" />
                        <input
                            type="button" value="List" className="btn btn-danger"
                            onClick={(e) => {
                                e.preventDefault();
                                //window.location.href = '/dashboard';
                                //props.history.push('/items')
                                //window.location.href = '/';
                                //props.history.goBack()
                                //props.history.replace('/items');
                            }}
                        /> 
                        <input
                            type="button" value="Cancel" className="btn btn-danger"
                            onClick={(e) => {
                                e.preventDefault();
                                //window.location.href = '/dashboard';
                            }}
                        /> 
                    </div>
                </form>
            </div>
            
            </Modal.Body>
            <Modal.Footer>
				<Button variant="secondary" onClick={props.onClose}>
					Close
					</Button>
				<Button variant="primary" onClick={() => console.log('submitted')}>
					Save Changes
					</Button>
			</Modal.Footer >
            </Modal>
    );
}


export default CreateTrailer;