import { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { withRouter } from "react-router-dom";
import { css } from "@emotion/css";
import clsx from "clsx";

import Button from "../components/Button";
import PokeImg from "../components/PokeImg";
import PokeCard from "../components/PokeCard";
import Typography from "../components/Typography";

import { GET_POKEMONS } from "../graphql/queries";
import { SPACINGS } from "../root/spacings";
import { COLORS } from "../root/colors";
import {
  marginBottomMd,
  marginBottomXxl,
  marginTopMd,
  marginTopXxl,
  textAlignCenter,
} from "../root/styles";

import { useLocalStorage } from "../helpers";

function List() {
  const observerRef = useRef(null);

  const [offset, setOffset] = useState(0);

  const [shouldLoadMore, setShouldLoadMore] = useState(false);

  const [pokedex, setPokedex] = useState([]);

  const [fetchPokedex, { loading, error }] = useLazyQuery(GET_POKEMONS, {
    fetchPolicy: "cache-first",
    onCompleted: (res) => {
      setOffset(res?.pokemons?.nextOffset);
      setPokedex(pokedex.concat(res?.pokemons?.results));
      setShouldLoadMore(false);
    },
  });

  const handleObserver = ([loadMoreEl]) => {
    if (loadMoreEl && loadMoreEl.isIntersecting) {
      setShouldLoadMore(true);
    }
  };

  useEffect(() => {
    let observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    let target = document.getElementById("list-load-barrier");

    if (target) observer.observe(target);
    observerRef.current = observer;
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const [persistedPokemons] = useLocalStorage("pokemons", []);

  const getPersistedPokemonsByName = {};
  persistedPokemons.forEach((pokemon) => {
    if (!getPersistedPokemonsByName[pokemon.name]) {
      getPersistedPokemonsByName[pokemon.name] = 1;
    } else {
      getPersistedPokemonsByName[pokemon.name] += 1;
    }
  });

  // FETCH DATASOURCE ON FIRST RENDER, OFFSET 0
  useEffect(() => {
    fetchPokedex({ offset: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMorePokedex = () => {
    fetchPokedex({ offset });
  };

  useEffect(() => {
    if (shouldLoadMore) {
      fetchPokedex({ variables: { offset } });
    }
  }, [shouldLoadMore, offset, fetchPokedex]);

  if (error) {
    return (
      <Typography variant="h2" className={marginTopXxl}>
        There's something wrong...
      </Typography>
    );
  }

  return (
    <>
      {persistedPokemons?.length ? (
        <Typography
          variant="h4"
          className={clsx(marginTopXxl, marginBottomXxl)}
        >
          {persistedPokemons?.length} Pokémon(s) you have owned.
        </Typography>
      ) : (
        <PokeImg
          src="https://ik.imagekit.io/xtrixia/Pocketmon/slogan_gJEa15Wil.svg"
          type="medium"
          alt="Slogan: gotta catch 'em all"
          className={marginTopXxl}
        />
      )}

      <Typography variant="h3">What Pokémon are you looking for?</Typography>

      {loading && (
        <Typography variant="h2" className={marginTopXxl}>
          Loading...
        </Typography>
      )}

      <ul>
        {pokedex.map((pokemon, index) => (
          <PokeCard
            isClickable
            key={index}
            url={`/profile/${pokemon.name}?img=${pokemon.image}`}
            title={pokemon.name}
            imgUrl={pokemon.image}
            totalOwned={getPersistedPokemonsByName[pokemon.name] || 0}
            className={css`
              margin: ${SPACINGS.lg} 0;
            `}
          />
        ))}
      </ul>

      {pokedex.length && !!offset ? (
        <>
          <Typography
            id="list-load-barrier"
            className={clsx(marginBottomMd, marginTopMd, textAlignCenter)}
            onClick={loadMorePokedex}
          >
            Load more
          </Typography>

          <Button
            className={css`
              position: fixed;
              bottom: 5%;
              padding: ${SPACINGS.lg};
              background: ${COLORS.primary};
              right: 10%;
              border-radius: 50%;
              :hover {
                background: ${COLORS.terniary};
              }
            `}
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
          >
            <img
              src="https://ik.imagekit.io/xtrixia/Pocketmon/left-arrow_J_B2Zp65M.svg"
              alt="Top arrow"
              width="16px"
              className={css`
                transform: rotate(90deg);
              `}
            />
          </Button>
        </>
      ) : null}
    </>
  );
}

export default withRouter(List);
