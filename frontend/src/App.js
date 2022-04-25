import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import "./App.css";
import Banner from "./components/Banner";
import Header from "./components/Header";
import ProductFeed from "./components/ProductFeed";
import Productfetching from "./context/ProductsFetching";
import Register from "./Register";
import Checkout from "./Checkout";
import Success from "./Success";
import Orders from "./Orders";

function App() {
  return (
    <div className="bg-gray-100">
      <Productfetching>
        <Switch>
          <Route exact path="/login">
            <div className="bg-white">
              <Login />
            </div>
          </Route>
          <Route exact path="/register">
            <div className="bg-white">
              <Register />
            </div>
          </Route>
          <Route exact path="/checkout">
            <div className="bg-white">
              <Checkout />
            </div>
          </Route>
          <Route exact path="/success">
            <div className="bg-white">
              <Success />
            </div>
          </Route>
          <Route exact path="/orders">
            <div className="bg-white">
              <Orders />
            </div>
          </Route>

          <Route exact path="/">
            <Header />
            <main className="max-w-screen-lg  mx-auto">
              <Banner />

              <ProductFeed />
            </main>
          </Route>
        </Switch>
      </Productfetching>
    </div>
  );
}

export default App;
