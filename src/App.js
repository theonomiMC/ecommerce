import React, { Component } from 'react'
import Header from './components/header/Header';
import CartPage from './pages/cart-page/CartPage';
import CheckOut from './pages/checkout/CheckOut';
import Loader from './components/loader/Loader';
import {
  Switch,
  Route,
} from "react-router-dom";

/* there's several ways to desplay products.
 Some of this are: pagination, infinit loading, "load more" button, lazy loading */
const Category = React.lazy(() => import('./pages/Category/Category'));
const ProductPage = React.lazy(() => import('./pages/productPage/ProductPage'));

class App extends Component {
  render() {
    return (
      <main>
        <Header />
        
        <React.Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path='/'>
              <Category title='all' />
            </Route>
            <Route exact path={'/product-cart'}>
              <CartPage />
            </Route>
            <Route exact path={'/checkout'}>
              <CheckOut />
            </Route>
            <Route exact
              path={["/:title", "/:title/:id"]}
              render={({ match }) => {
                if (match.params.id) {
                  return <ProductPage id={match.params.id} />
                } if (match.params.title) {
                  return <Category title={match.params.title} id={match.params.id} />
                }
              }}
            />
          </Switch>
        </React.Suspense>
      </main>
    )
  }
}

export default App