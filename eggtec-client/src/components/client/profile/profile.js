
import React, { Component } from 'react';
import axios from 'axios';
import { Col, Form, Button, Card } from 'react-bootstrap';
import Modal from './update-profile';
import 'bootstrap/dist/css/bootstrap.min.css';


// import LoginNavBar from '../../shared/nav-bar/login-navbar';
import Container from 'react-bootstrap/Container';
// import Table from '../../shared/react-table/react-table'
import Row from 'react-bootstrap/Row';

import styles from './profile.module.css'

class ProfilePage extends Component {
  constructor(props) {
    super(props)
    //let sessionUser = JSON.parse(window.sessionStorage.getItem("currentUser"))
    this.state = {
      profile: {
        ID: 1,
        "First Name": 'David',
        "Last Name": 'Mosquera',
        Email: 'test@test.com'
      },
      titles: [
        'ID',
        'First Name',
        'Last Name',
        'Email'
      ],
      showModal: false

      // currentUserRole: sessionUser.role,
      //mongoData: [],
      // editedData: {} // gonna be sent to the backend to update the db
    }
  }

  /*
      async getRegisterData() {
          const registerRes = await axios.get('http://localhost:4000/register')
          this.setState({ loading: false, mongoData: registerRes.data.data })
      }
  
      componentDidMount() {
          this.getRegisterData()
      }
  
      onEdit = (_id, rowIndex, column, newVal) => {
          const newData = [...this.state.mongoData]
          newData[rowIndex][column] = newVal
          
          this.setState(
              {
                  mongoData: newData,
                  editedData: { ...this.state.editedData, [_id]: { ...this.state.editedData[_id], [column]: newVal } }
              },
              () => {
                  console.log(this.state.editedData)
              }
          )
          
      }
  */

  showModal = () => this.setState({ showModal: true });
  hideModal = () => this.setState({ showModal: false });


  render() {
    return (
    <Card className="text-center" style={{width: '18rem'}}>
      <div>
        {/* <LoginNavBar /> */}
        <Card.Header>
        <h1 className="text-center" id='title'>Profile</h1>
        </Card.Header>
        <div className={styles.container}>
          {this.state.titles.map(title => (
            <div className={styles.row}>
              <p className={styles.title}>{title}</p>
              <p className={styles.value}>{this.state.profile[title]}</p>
            </div >
          ))}
        </div >
        <Button variant="primary" onClick={this.showModal}>
          Update Profile
        </Button>
        <Modal show={this.state.showModal} onClose={this.hideModal} />
      </div>
      </Card>
    )
  }

}

export default ProfilePage;