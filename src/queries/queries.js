import { gql } from 'apollo-boost';



const getMakeQuery = gql`

{
    makes {
        name
        id
        country
    }
}

`
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
//mutation contains query variables
const addCarMutation = gql`
mutation($model: String!, $type: String!, $manufactureDate: Int!, $makeId: ID!) {
    addCar(model: $model, type: $type, manufactureDate:$manufactureDate, makeId: $makeId) {
        model
        id
    }
}
`

const getSingleCarQuery = gql`

query($id: ID){
    car(id: $id){
        id
        model
        type
        manufactureDate
        maker {
            name
            foundedDate
            country
            id
            cars {
                model
                type
            }
        }
    }
}
`

export {getMakeQuery, getCarQuery, addCarMutation, getSingleCarQuery}