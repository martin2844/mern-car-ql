import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from '@apollo/react-hoc';


const getMakerQuery = gql`

{
    makes {
        name
        id
        country
    }
}

`



class AddCar extends Component {
    render() {
        return (
            <div>
               <form id="add-car">
                   <div className="field">
                       <label>Car Model:</label>
                       <input type="text" />
                   </div>
                   <div className="field">
                       <label>Car type:</label>
                       <input type="text" />
                   </div>
                   
                   <div className="field">
                       <label>Car manufacture date:</label>
                       <input type="text" />
                   </div>
                   <div className="field">
                       <label>Make:</label>
                       <select>select make</select>
                   </div>
                   
                   <button>Add</button>
                   
                   
               </form> 
            </div>
        )
    }
}

export default graphql(getMakerQuery)(AddCar);
