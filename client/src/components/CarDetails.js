import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { getSingleCarQuery } from '../queries/queries';


class CarDetails extends Component {

    displayCarDetails(){
        const { car } = this.props.data;
        if(car){
            return (
                <div>
                    <h2>{car.maker.name} {car.model}</h2>
                    <p>{car.manufactureDate} {car.type}</p>
                    <p>{car.maker.name} is a brand from {car.maker.country}, founded in {car.maker.foundedDate}</p>
                    <p>Other Cars:</p>
                    <ul className="other-cars">
                     {car.maker.cars.map(car => <li key={car.id}>{car.model} - {car.type}</li>)} 
                    </ul>
                </div>
            );
        } else {
            return(
                <div>Select a car!</div>
            )
        }
    }

    render() {
    
        //this.props because its a class component. check
        console.log(this.props)
        return (
            <div id="book-details">
                {this.displayCarDetails()}
                
            </div>
        )
    }
}
// we can pass a second parameter to the query, as an object, with an options
// value as 
export default graphql(getSingleCarQuery, {
options: (props) => {
    return {
        variables: { 
            id: props.carId
        }
    }
}
})(CarDetails);