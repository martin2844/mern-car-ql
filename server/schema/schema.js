// file to define a schema which will be followed by the querying
const graphql = require('graphql');
/* Our Schema will describe the data on the graph, the object types,
the relations between our object type, how we can reach into the graph to
interact with the data, to get the data, to mutate it. */


//lodash capabilities required to facilitate stuff
const _ = require('lodash')





//destructure object type from graphql, and more
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

// dummy data to test

let cars = [
    {
        model: "NX2000",
        type: "legend",
        manufactureDate: 1992,
        id: '1',
        makerId: "1"
    },
    {
        model: "Skyline",
        type: "legend",
        manufactureDate: 1990,
        id: '2',
        makerId: "1"
    },
    {
        model: "Camry",
        type: "sedan",
        manufactureDate: 1998,
        id: '3',
        makerId: "2"
    },
    {
        model: "Supra",
        type: "legend",
        manufactureDate: 1997,
        makerId: "2"
    },
    {
        model: "Crown Victoria",
        type: "sedan",
        manufactureDate: 1994,
        makerId: "3"
    },
    {
        model: "Windstar",
        type: "minivan",
        manufactureDate: 1996,
        makerId: "3"
    }
]

let makers = [
    {   
        id: "1",
        name: "Nissan",
        foundedDate: 1932,
        country: "Japan"
        
    },
    {   
        id: "2",
        name: "Toyota",
        foundedDate: 1922,
        country: "Japan"
        
    },
    {   
        id: "3",
        name: "Ford",
        foundedDate: 1898,
        country: "USA"
        
    },
]

//first define the object type
//define Car type object
const CarType = new GraphQLObjectType({
    name: 'Car',
    //fields will be a function in order to be relatad with other types
    //es6 arrow type function which returns directly via parenthesis.
    fields: () => ({
        //define type of data
        id: {type: GraphQLID },
        model: {type: GraphQLString },
        type: {type: GraphQLString },
        manufactureDate: {type: GraphQLInt },
        //relate types.
        maker: {
            type: MakeType,
            resolve(parent, args) {
                //graphql is resolving who the maker is by searching the
                //parent element, which is the car itself, grabbing makerId
                // which is defined in that object, and using it to find the maker object
                return _.find(makers, {id: parent.makerId});
            }
        }

    })
})



//define Make type object, this is the brand of the car
const MakeType = new GraphQLObjectType({
    name: 'Make',
    //fields will be a function in order to be relatad with other types
    //es6 arrow type function which returns directly via parenthesis.
    fields: () => ({
        //define type of data
        id: {type: GraphQLID },
        name: {type: GraphQLString },
        foundedDate: {type: GraphQLInt },
        country: {type: GraphQLString},
        cars: {
            //this is different than the car type, because a car type has only one maker, whilst a maker can have
            //a whole list of car types
            type: new GraphQLList(CarType),
            resolve(parent, args){ 
                //lodash method to filter all car types, via the maker Id contained in the car type
                return _.filter(cars, {makerId: parent.id});
            }
        }

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
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to get data from db / or other source
                // we will get for ex. the args.id to search in our mongodb by ID

                //use lodash find to look for the id within the cars dummy array.
                return _.find(cars, {id: args.id});
            }
        },
        make: {
            type: MakeType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(makers, {id: args.id})
            }
        },
        cars: {
            //since this returns all cars, its not a CarType but a graphql list type
            type: new GraphQLList(CarType),
            resolve(parent,args){
                //since we arent sorting anything, we just need to return the whole cars array
                return cars
            }
        },
        makers: {
            type: new GraphQLList(MakeType),
            resolve(/*parent,args*/) {
                //since we arent sorting anything, we just need to return the whole maker array
                return makers;
            }
        }
        
    }
})

//export this to be used by express as a module.export
module.exports = new GraphQLSchema({
    // export as a graphqlschema, and the query is the const we defined as RootQuery
    query: RootQuery
})