import { useQuery } from "@apollo/client";
import { Link, withRouter } from "react-router-dom";

import { GET_POKEMONS } from "../graphql/queries";

function List() {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    fetchPolicy: "cache-first",
  });

  return (
    <div>
      <h1>Your pocket-size Pokémon website</h1>

      <Link to="/pocket">My Pokémon List</Link>

      {loading && <p>Loading...</p>}

      {error && <p>Error!</p>}

      <ul>
        {data?.pokemons?.results?.map((pokemon, index) => (
          <li key={index}>
            <Link to={`/profile/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withRouter(List);
