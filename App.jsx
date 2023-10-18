import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";                    //ask
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";

function App() {
  return (
      <ApolloProvider client={client}>                                
        <Router>                                                            //ask
        <>
          <Navbar />
          <Outlet />                                                     //ask
          <Switch>
            <Route exact path="/" component={SearchBooks} />
            <Route exact path="/saved" component={SavedBooks} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />    
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}
    

export default App;
