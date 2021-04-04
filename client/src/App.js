import Auth from './Components/Auth/Auth'
import {Home} from './Components/Home/Home'
import Browser from './Components/Browser/Browser'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {Navigation} from './Components/Home/Navigation/Navigation'


import CartScreen from "./Screens/CartScreen";
import BookScreen from "./Screens/BookScreen";
import ListAllBooks from "./Screens/ListAllBooks";
import WishlistScreen from "./Screens/WishlistScreen";
import AuthorBooksScreen from './Screens/AuthorBooksScreen';

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
              <CartScreen/>
          </Route>

          <Route exact path='/book/:id' component={BookScreen} />

           <Route exact path='/wishlist/:id?' component={WishlistScreen} />

          <Route exact path='/listofbooks' component={ListAllBooks} />
          <Route exact path='/authorbooks/:id' component={AuthorBooksScreen} />
      </Switch>
    </Router>
  );
}

export default App;
