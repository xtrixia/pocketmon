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
      height
      weight
      types {
        type {
          name
        }
      }
      abilities {
        ability {
          name
          url
        }
      }
      moves {
        move {
          name
          url
        }
      }
      stats {
        base_stat
        stat {
          url
          name
        }
      }
      # forms {
      #   name
      # }
      # species {
      #   name
      # }
    }
  }
`;
