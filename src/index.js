import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import List from "./components/List";
import Detail from "./components/Detail";
import MyList from "./components/MyList";
import Container from "./ui_palette/Container";
import reportWebVitals from "./reportWebVitals";

import "./index.scss";

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Container>
            <Route exact path="/" component={Home} />
            <Route exact path="/list" component={List} />
            <Route exact path="/profile/:id" component={Detail} />
            <Route exact path="/pocket" component={MyList} />
          </Container>
        </Switch>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
