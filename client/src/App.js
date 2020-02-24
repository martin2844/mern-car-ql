import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import { Typography, Divider } from 'antd';
import "antd/dist/antd.css";

import "./App.css";


import CarList from './components/CarList';
import AddCar from './components/AddCar';


//apollo client setup
const client = new ApolloClient({
  //this is the endpoint where we have our graphql queries
  uri: 'http://localhost:5000/graphql',
})

class App extends React.Component {
  render() {
    const { Title } = Typography;
    return (
      <ApolloProvider client={client}>
      <div id="main" >

      <Title level={1}>My Favourite Cars</Title>
      <Divider /> 
      <CarList/>

      <AddCar/>


      </div>
      </ApolloProvider>
    )
  }
}

export default App