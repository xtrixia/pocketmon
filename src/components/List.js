import { useQuery } from "@apollo/client";
import { withRouter } from "react-router-dom";
import { css } from "@emotion/css";

import PokeCard from "../ui_palette/PokeCard";
import Typography from "../ui_palette/Typography";

import { GET_POKEMONS } from "../graphql/queries";
import { SPACINGS } from "../root/spacings";
import { BREAKPOINTS } from "../root/breakpoints";

import { useLocalStorage } from "../helpers";

const heading = css`
  padding: ${SPACINGS.md} 0;
`;

function List() {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    fetchPolicy: "cache-first",
  });

  const [persistedPokemons] = useLocalStorage("pokemons", []);

  return (
    <>
      <Typography variant="h2" className={heading}>
        {persistedPokemons?.length} Pokémon(s) you have owned.
      </Typography>

      <Typography variant="h3" className={heading}>
        What Pokémon are you looking for?
      </Typography>

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
              @media (min-width: ${BREAKPOINTS.sm}) {
              }
            `}
          />
        ))}
      </ul>
    </>
  );
}

export default withRouter(List);
