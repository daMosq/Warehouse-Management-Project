import ProfilePage from '../../client/profile/profile'
import EmployeeDashboard from '../../client/dashboard/dashboard'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import ItemDashboard from '../../client/dashboard/item-dash';
import TruckDashboard from '../../client/dashboard/truck-dash';

const sideBarRouter = (props) => {
    return (
        <Switch>
            <Route path="/profile" component={ProfilePage} />
            <Route path="/items" component={ItemDashboard} />
            <Route path="/employees" component={EmployeeDashboard} />
            <Route path="/trucks" component={TruckDashboard} />
        </Switch>
    )
}

export default sideBarRouter;