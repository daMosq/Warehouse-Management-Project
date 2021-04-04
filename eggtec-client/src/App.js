import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import LoginForm from './components/shared/login/login';
import EmployeeDashboard from './components/client/dashboard/dashboard';
import RegisterForm from './components/shared/register/register';
import UpdateProfile from './components/client/profile/update-profile';
import ProfilePage from './components/client/profile/profile';
import CreateItem from './components/client/item-crud/create-item';
import DeleteItem from './components/client/item-crud/delete-item';
import EditItem from './components/client/item-crud/edit-item';
import Logout from './components/shared/login/logout';
import sideBar from './components/shared/sidebar/sideBar';



function App() {
  return (
    
    <Router>
    <Switch>
      <Route path="/" exact component={LoginForm} />
      <Route path="/register" component={RegisterForm} />
      <Route path="/dashboard" component={sideBar} />
      
    </Switch>
  </Router>
      
  );
}

export default App;
