import { useQuery } from "@apollo/client";
import { Link, withRouter } from "react-router-dom";
import { css } from "@emotion/css";

import PokeCard from "../ui_palette/PokeCard";
import Typography from "../ui_palette/Typography";

import { GET_POKEMONS } from "../graphql/queries";
import { SPACINGS } from "../root/spacings";

function List() {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    fetchPolicy: "cache-first",
  });



  return (
    <>
      <Typography variant="h2">What Pokémon are you looking for?</Typography>

      <Link to="/pocket">My Pokémon List</Link>

      {loading && <p>Loading...</p>}

      {error && <p>Error!</p>}

      <ul>
        {data?.pokemons?.results?.map((pokemon, index) => (
          <PokeCard
            key={index}
            title={pokemon.name}
            imgUrl={pokemon.image}
            totalOwned={pokemon.totalOwned || 0}
            className={css`
              margin: ${SPACINGS.lg} 0;
              @media (min-width: 600px) {
              }
            `}
          />
        ))}
      </ul>
    </>
  );
}

export default withRouter(List);
