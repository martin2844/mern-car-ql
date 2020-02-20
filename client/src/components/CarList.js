import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from '@apollo/react-hoc';

const getCarQuery = gql`
    {
        cars {
            maker {
              name
            }
            model
            type
            manufactureDate
            id
          }
    }
`


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
        console.log(this.props)
        return (
            <div id="car-list">
                {this.displayCars()}
                
            </div>
        )
    }
}

export default graphql(getCarQuery)(CarList);