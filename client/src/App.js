import React from 'react';
import CarList from './components/CarList';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

//apollo client setup
const client = new ApolloClient({
  //this is the endpoint where we have our graphql queries
  uri: 'http://localhost:5000/graphql',
})

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div id="main">

      <h1>My Favourite Cars</h1>
      <CarList/>


      </div>
      </ApolloProvider>
    )
  }
}

export default App