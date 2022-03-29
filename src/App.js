import React, { Component } from 'react'
import Header from './components/header/Header';
import CartPage from './pages/cart-page/CartPage';
import CheckOut from './pages/checkout/CheckOut';
import Loader from './components/loader/Loader';
import Error from './components/error/Error';
import {
  Switch,
  Route,
} from "react-router-dom";
import { graphql } from '@apollo/client/react/hoc';
import { gql } from "@apollo/client";

/* there's several ways to desplay products.
 Some of this are: pagination, infinit loading, "load more" button, lazy loading */
const Category = React.lazy(() => import('./pages/Category/Category'));
const ProductPage = React.lazy(() => import('./pages/productPage/ProductPage'));

class App extends Component {
  render() {
    const { data } = this.props
    const { laoding, error } = data
    const allProducts = data?.categories && data?.categories[0].products

    return (
      <main>
        <Header />
        <React.Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path='/'>
              <Category products={allProducts}
                error={data.error}
                laoding={data.loading}
              />
            </Route>

            {data?.categories && data.categories.map(cat =>
              <Route exact path={`/${cat.name}`} key={cat.name}>
                <Category
                  products={cat.products}
                  name={cat.name}
                  loading={data.loading}
                />
              </Route>
            )}
            {data?.categories && data?.categories.map(cat => (
              <Route exact path={`/${cat.name}/:id`}
                key={cat.name}
                render={({ match }) => (
                  <ProductPage id={match.params.id} />
                )}
              >
              </Route>))}
            <Route exact path={'/product-cart'}>
              <CartPage />
            </Route>
            <Route exact path={'/checkout'}>
              <CheckOut />
            </Route>
          </Switch>
        </React.Suspense>
        {error && <Error />}
        {laoding && <Loader />}
      </main >
    )
  }
}

export default graphql(
  gql`
    query {
      categories{
        name
        products {
          id
          name
          inStock
          gallery
          category
          attributes {
            id
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            currency {
              label
              symbol
            }
            amount
          }
          brand
        }
      }
    }
  `,
)(App);
