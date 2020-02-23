import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { getSingleCarQuery } from '../queries/queries';


class CarDetails extends Component {

    render() {
        //this.props because its a class component. check
        return (
            <div id="book-details">
                <p>Output car details here</p>
                
            </div>
        )
    }
}

export default graphql(getSingleCarQuery)(CarDetails);