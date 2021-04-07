import SideBarRouter from '../sidebar/sideBarRouter';
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import styles from './sideBar.module.css';
import LoginNavBar from '../nav-bar/login-navbar';
import { FaUser, FaTruck, FaUserFriends, FaTruckLoading } from 'react-icons/fa'
import { BsFillBagFill } from 'react-icons/bs'
import { MdStorage } from 'react-icons/md'

const SideBar = (props) => {
    return (
        <Router>
            <LoginNavBar />
            <div className={styles.container}>
                <div className={styles.sideBarContainer} >
                    <NavLink activeClassName={styles.selected} to="/profile"><FaUser className={styles.marginRight} /> Profile</NavLink>
                    <NavLink activeClassName={styles.selected} to="/items"><MdStorage className={styles.marginRight} />Inventory</NavLink>
                    <NavLink activeClassName={styles.selected} to="/employees"><FaUserFriends className={styles.marginRight} /> Employees</NavLink>
                    <NavLink activeClassName={styles.selected} to="/trucks"><FaTruck className={styles.marginRight} /> Trucks & Trailers</NavLink>
                    <NavLink activeClassName={styles.selected} to="/orders"><BsFillBagFill className={styles.marginRight} /> Orders</NavLink>
                    <NavLink activeClassName={styles.selected} to="/ships"><FaTruckLoading className={styles.marginRight} /> Shipments</NavLink>
                </div>
                <SideBarRouter />
            </div>
        </Router>
    )
}

export default SideBar;