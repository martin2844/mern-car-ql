import React, { Component } from 'react'
import { graphql } from '@apollo/react-hoc';
import { getMakeQuery } from '../queries/queries';



class AddCar extends Component {
    //set in state of the object
    constructor(props) {
        super(props);
        this.state = {
            model: "",
            type: "",
            manufactureDate: "",
            makeId:""
        }
    }
    displayMakes(){
        //data object is attached to props when we bind a query to the export
        let data = this.props.data
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
        console.log(this.state);
    }
    render() {
        return (
            <div>
               <form onSubmit={this.submitForm.bind(this)} id="add-car">
                   <div className="field">
                       <label>Car Model:</label>
                       {/* e is the event, target is the input, and value is what I type */}
                       <input type="text" onChange={(e) => this.setState({name: e.target.value})} />
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

export default graphql(getMakeQuery)(AddCar);
