import Auth from './Components/Auth/Auth'
import {Home} from './Components/Home/Home'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {Navigation} from './Components/Home/Navigation/Navigation'

// import CartScreen from "./screens/CartScreen";
import BookScreen from "./screens/BookScreen";
import ListAllBooks from "./screens/ListAllBooks";

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
          <Route path = '/cart/:id?'>
              {/* <CartScreen/> */}
          </Route>
          <Route exact path='/book/:id' component={BookScreen} />
          <Route exact path='/listofbooks' component={ListAllBooks} />
      </Switch>
    </Router>
  );
}

export default App;
