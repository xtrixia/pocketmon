import { useQuery } from "@apollo/client";
import { withRouter } from "react-router-dom";
import { css } from "@emotion/react";

import PokeImg from "../ui_palette/PokeImg";
import PokeCard from "../ui_palette/PokeCard";
import Typography from "../ui_palette/Typography";
import SloganSVG from "../assets/slogan.svg";

import { GET_POKEMONS } from "../graphql/queries";
import { SPACINGS } from "../root/spacings";
import { BREAKPOINTS } from "../root/breakpoints";
import { marginTopXxl } from "../root/styles";

import { useLocalStorage } from "../helpers";

const heading = css`
  padding: ${SPACINGS.md} 0;
`;

function List() {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    fetchPolicy: "cache-first",
  });

  const [persistedPokemons] = useLocalStorage("pokemons", []);

  const getPersistedPokemonsByName = {};
  persistedPokemons.forEach((pokemon) => {
    if (!getPersistedPokemonsByName[pokemon.name]) {
      getPersistedPokemonsByName[pokemon.name] = 1;
    } else {
      getPersistedPokemonsByName[pokemon.name] += 1;
    }
  });

  if (error) {
    return (
      <Typography variant="h2" className={marginTopXxl}>
        There's something wrong...
      </Typography>
    );
  }

  return (
    <>
      {loading && (
        <Typography variant="h2" className={marginTopXxl}>
          Loading...
        </Typography>
      )}

      {persistedPokemons?.length ? (
        <Typography variant="h2" className={heading}>
          {persistedPokemons?.length} Pokémon(s) you have owned.
        </Typography>
      ) : (
        <PokeImg
          src={SloganSVG}
          type="medium"
          alt="Slogan: gotta catch 'em all"
          className={marginTopXxl}
        />
      )}

      <Typography variant="h3" className={heading}>
        What Pokémon are you looking for?
      </Typography>

      <ul>
        {data?.pokemons?.results?.map((pokemon, index) => (
          <PokeCard
            isClickable
            key={index}
            url={`/profile/${pokemon.name}?img=${pokemon.image}`}
            title={pokemon.name}
            imgUrl={pokemon.image}
            totalOwned={getPersistedPokemonsByName[pokemon.name] || 0}
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
