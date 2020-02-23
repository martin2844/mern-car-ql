import React, { Component } from 'react'
import { graphql } from '@apollo/react-hoc';
import { getMakeQuery, addCarMutation, getCarQuery } from '../queries/queries';
import compose from "lodash.flowright";



class AddCar extends Component {
    //set in state of the object
    constructor(props) {
        super(props);
        this.state = {
            model: "",
            type: "",
            manufactureDate: "",
            makeId: ""
        }
    }
    displayMakes(){
        //data object is attached to props when we bind a query to the export
        //changed data to getMakeQuery after adding compose
        let data = this.props.getMakeQuery;
        if(data.loading){
            return <option disabled>loading makes</option>
        } else {
            return data.makes.map((make) => {
                return (
                    <option key={make.id} value={make.id}>{make.name}</option>
                )
            })
        }
    }
    submitForm(e) {
        e.preventDefault();
        //the name of this function inside props is given inside the object, inside the compose function
        // at the bottom
        // Inside this function we can pass the graphql variables that will be taken into account while
        //running the query
        console.log(this.state)
        this.props.addCarMutation({
            variables: {
                model: this.state.model,
                type: this.state.type,
                manufactureDate: parseInt(this.state.manufactureDate),
                makeId: this.state.makeId
            },
            refetchQueries: [{query: getCarQuery}]
        });
    }
    render() {
        return (
            <div>
               <form onSubmit={this.submitForm.bind(this)} id="add-car">
                   <div className="field">
                       <label>Car Model:</label>
                       {/* e is the event, target is the input, and value is what I type */}
                       <input type="text" onChange={(e) => this.setState({model: e.target.value})} />
                   </div>
                   <div className="field">
                       <label>Car type:</label>
                       <input type="text" onChange={(e) => this.setState({type: e.target.value})} />
                   </div>
                   
                   <div className="field">
                       <label>Car manufacture date:</label>
                       <input type="number" onChange={(e) => this.setState({manufactureDate: e.target.value})}/>
                   </div>
                   <div className="field">
                       <label>Make</label>
                       <select onChange={(e) => this.setState({makeId: e.target.value})}>
                       <option>select make</option>
                       {this.displayMakes()}
                       </select>
                   </div>
                   
                   <button>Add</button>
                   
                   
               </form> 
            </div>
        )
    }
}

//How to bind to queries to a component
export default compose(
    graphql(getMakeQuery, {name:"getMakeQuery"}),
    graphql(addCarMutation, {name: "addCarMutation"})

)(AddCar);