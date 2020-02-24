import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { getCarQuery } from '../queries/queries';
import CarDetails from './CarDetails'
import { Button, Spin, Divider } from 'antd';


class CarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        }
    }

    displayCars(){
        let data = this.props.data;
        if(data.loading){
            return(
             

                   <Spin style={{margin: "0 auto", display: "block"}} size="large" />
            
            )
        } else {
            return(
                data.cars.map((car) => {
                    return (
                        
                        <Button style={{margin: "20px"}} onClick={(e) => {this.setState({selected: car.id})}} key={car.id}>{car.model}</Button>
                    )
                })
            )
        }
    }


    render() {
        //this.props because its a class component. check
        return (
            <div id="car-list">
                <div>
                {this.displayCars()}
                </div>
                <Divider />
                <CarDetails carId={this.state.selected}/>
            </div>
        )
    }
}

export default graphql(getCarQuery)(CarList);