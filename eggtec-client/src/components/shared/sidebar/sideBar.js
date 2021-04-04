import SideBarRouter from '../sidebar/sideBarRouter'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import styles from './sideBar.module.css'
import LoginNavBar from '../nav-bar/login-navbar';

const SideBar = (props) => {
    return (
        <Router>
            <LoginNavBar />
            <div className={styles.container}>
            <div className={styles.sideBarContainer} >
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/items">Inventory</Link>
                    </li>
                    <li>
                        <Link to="/employees">Employees</Link>
                    </li>
                    <li>
                        <Link to="/trucks">Trucks & Trailers</Link>
                    </li>
                    <li>
                        <Link to="/orders">Orders</Link>
                    </li>
                    <li>
                        <Link to="/ship">Shipment</Link>
                    </li>
                    

                </ul>
                
            </div>
            <SideBarRouter />
            </div>
        </Router>
    )
}

export default SideBar;