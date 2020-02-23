import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { getCarQuery } from '../queries/queries';
import CarDetails from './CarDetails'

class CarList extends Component {

    displayCars(){
        let data = this.props.data;
        if(data.loading){
            return(
                <div>Loading cars</div>
            )
        } else {
            return(
                data.cars.map((car) => {
                    return (
                        <li key={car.id}>{car.model}</li>
                    )
                })
            )
        }
    }


    render() {
        //this.props because its a class component. check
        return (
            <div id="car-list">
                {this.displayCars()}
                <CarDetails/>
            </div>
        )
    }
}

export default graphql(getCarQuery)(CarList);