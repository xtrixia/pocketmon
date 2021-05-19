import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query pokemons {
    pokemons {
      results {
        id
        url
        name
        image
      }
    }
  }
`;

export const GET_POKEMON_BY_NAME = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      name
      moves {
        move {
          url
          name
        }
      }
      types {
        slot
        type {
          url
          name
        }
      }
      height
      abilities {
        ability {
          url
          name
        }
      }
    }
  }
`;
