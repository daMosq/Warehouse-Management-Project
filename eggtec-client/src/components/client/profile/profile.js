
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from './update-profile';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className={styles.container}>
        <h1 className={styles.title}>Profile</h1>
        <div className={styles.separator}></div>
        {this.state.titles.map(title => (
          <>
            <p className={styles.subtitle}>{title}</p>
            <p className={styles.value}>{this.state.profile[title]}</p>
          </>
        ))}
        <Button variant="primary" className={styles.button} onClick={this.showModal}>
          Update Profile
          </Button>
        <Modal show={this.state.showModal} onClose={this.hideModal} />
      </div>
    )
  }
}

export default ProfilePage;