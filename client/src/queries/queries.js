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

export {getMakeQuery, getCarQuery}