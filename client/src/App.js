import Auth from './Components/Auth/Auth'
import {Home} from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Browser from './Components/Browser/Browser'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {Navigation} from './Components/Home/Navigation/Navigation'
function App() {
  return (
    <Router >
      <Navigation/>
      <Switch>

          <Route path = '/auth' exact = {true}>
              <Auth/>
          </Route>

          <Route path = '/' exact = {true}>
              <Home />
          </Route>

          <Route path = '/browse' exact = {true}>
              <Browser />
          </Route>

          <Route path = '/cart/:id?'>
              <Cart/>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
