import React from "react";
import "./assets/css/App.css";
import "./assets/css/login.css";
import { PrivateRoute, PrivateRouteAdmin } from "./components";
import {
  Visie,
  Producten,
  Praktisch,
  Hoofdpagina,
  Login,
  Register,
  AddAppointmentForm,
  AddProductForm,
  AddVerkoperForm,
  EditProductForm,
  NotificationScreen,
  NotFound,
  WieBenIkPagina,
} from "./pages";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "./context/UserProvider";
import { ProductProvider } from "./context/ProductProvider";
import { VerkoperProvider } from "./context/VerkoperProvider";

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <VerkoperProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Hoofdpagina} />
              <Route path="/WieBenIkPagina" component={WieBenIkPagina} />
              <Route path="/Producten" component={Producten} />
              <Route path="/Visie" component={Visie} />
              <Route path="/Praktisch" component={Praktisch} />
              <Route path="/login" component={Login} />
              <Route path="/Register" component={Register} />
              <Route
                path="/NotificationScreen"
                component={NotificationScreen}
              />
              <Route
                path="/AddAppointmentForm"
                component={AddAppointmentForm}
              />
              <PrivateRouteAdmin
                path="/AddProductForm"
                component={AddProductForm}
              />
              <PrivateRouteAdmin
                path="/AddVerkoperForm"
                component={AddVerkoperForm}
              />
              <PrivateRoute
                path="/EditProductForm"
                component={EditProductForm}
              />
              <Route path="*" component={NotFound}></Route>
            </Switch>
          </Router>
        </VerkoperProvider>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
