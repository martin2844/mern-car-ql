// file to define a schema which will be followed by the querying
const graphql = require('graphql');
/* Our Schema will describe the data on the graph, the object types,
the relations between our object type, how we can reach into the graph to
interact with the data, to get the data, to mutate it. */


//lodash capabilities required to facilitate stuff
const _ = require('lodash')





//destructure object type from graphql, and more
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

// dummy data to test

let cars = [
    {
        model: "NX2000",
        type: "legend",
        manufactureDate: 1992,
        id: '1'
    },
    {
        model: "Skyline",
        type: "legend",
        manufactureDate: 1990,
        id: '2'
    }
    {
        model: "Camry",
        type: "sedan",
        manufactureDate: 1998,
        id: '3'
    }
]

//first define the object type
//define Car type object
const CarType = new GraphQLObjectType({
    name: 'Car',
    //fields will be a function in order to be relatad with other types
    //es6 arrow type function which returns directly via parenthesis.
    fields: () => ({
        //define type of data
        id: {type: GraphQLString },
        model: {type: GraphQLString },
        type: {type: GraphQLString },
        manufactureDate: {type: GraphQLInt }

    })
})


// define the access points in which the user will get the data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    // we dont need to wrap fields inside a function
    fields: {
        //defines the name of query
        car: {
            type: CarType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                // code to get data from db / or other source
                // we will get for ex. the args.id to search in our mongodb by ID

                //use lodash find to look for the id within the cars dummy array.
                return _.find(cars, {id: args.id});
            }
        }
    }
})

//export this to be used by express as a module.export
module.exports = new GraphQLSchema({
    // export as a graphqlschema, and the query is the const we defined as RootQuery
    query: RootQuery
})