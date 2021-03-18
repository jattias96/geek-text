import Auth from './Components/Auth/Auth'
import {Home} from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {Navigation} from './Components/Home/Navigation/Navigation'
import {SideBar} from './Components/Dashboard/SideBar/SideBar'
import {DashboardHome} from './Components/Dashboard/DashboardHome'

function App() {
  return (
    <Router >
      <Navigation/>
      <Switch>
          <Route path = '/dashboard' exact = {true}>{/* After the user clicks the dashboard link, it opens the dashboard page */}
              <div className = "dashboard-divider">
                <SideBar />{/*Displays to the user dthe sideBar containg Manage Personal Information, Login Details, Credit Card Information, Shipping Address */}
                <DashboardHome/>
              </div>
          </Route>
          <Route path = '/auth' exact = {true}>
              <Auth/>
          </Route>
          <Route path = '/' exact = {true}>
              <Home />
          </Route>
          <Route path = '/cart/:id?'>
              <Cart/>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
