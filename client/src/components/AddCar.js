import React, { Component } from 'react'
import { graphql } from '@apollo/react-hoc';
import { getMakeQuery, addCarMutation, getCarQuery } from '../queries/queries';
import compose from "lodash.flowright";
import { Icon, Divider } from 'antd';


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
                    <option className="ant-select-dropdown-menu-item" key={make.id} value={make.id}>{make.name}</option>
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
                <Divider />
                <h1>Add a car!</h1>
               <form onSubmit={this.submitForm.bind(this)} id="add-car">
                   <div className="field">
                       <label>Car Model:</label>
                       {/* e is the event, target is the input, and value is what I type */}
                       <input className="ant-input" type="text" onChange={(e) => this.setState({model: e.target.value})} />
                   </div>
                   <div className="field">
                       <label>Car type:</label>
                       <input className="ant-input" type="text" onChange={(e) => this.setState({type: e.target.value})} />
                   </div>
                   
                   <div className="field">
                       <label>Car manufacture date:</label>
                       <input className="ant-input" type="number" onChange={(e) => this.setState({manufactureDate: e.target.value})}/>
                   </div>
                   <div className="field">
                       <label>Make</label>
                       <select className="ant-select ant-select-selected ant-input" onChange={(e) => this.setState({makeId: e.target.value})}>
                       <option className="ant-select-dropdown-menu-item-group">select make</option>
                       {this.displayMakes()}
                       </select>
                   </div>
                   
                   <button className="ant-btn ant-btn-primary ant-btn-circle ant-btn-lg ant-btn-icon-only" style={{marginTop: "20px"}} type="primary" shape="circle">
                   <Icon type="plus" />
                    </button>
                   
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