import { useState, useMemo } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { css } from "@emotion/css";
import clsx from "clsx";

import Typography from "../components/Typography";
import TextBox from "../components/TextBox";
import PokeCard from "../components/PokeCard";
import Button from "../components/Button";
import Modal from "../components/Modal";

import { SPACINGS } from "../root/spacings";
import { COLORS } from "../root/colors";
import { BREAKPOINTS } from "../root/breakpoints";
import {
  marginBottomXxl,
  marginTopMd,
  marginTopXxl,
  textAlignCenter,
} from "../root/styles";

import { useLocalStorage } from "../helpers";

function MyList() {
  const history = useHistory();

  const [nicknameInput, setNicknameInput] = useState("");

  const [selectedPokemonToRelease, setSelectedPokemonToRelease] = useState("");

  const [persistedPokemons, setPersistedPokemons] = useLocalStorage(
    "pokemons",
    []
  );

  const releasePokemon = (selectedPokemon) => {
    const persistedPokemonsLeft = persistedPokemons.filter(
      (pokemon) => selectedPokemon !== pokemon.nickname
    );
    setPersistedPokemons(persistedPokemonsLeft);
    setSelectedPokemonToRelease("");
  };

  const confirmationDialog = (selectedPokemon) => {
    setSelectedPokemonToRelease(selectedPokemon);
  };

  const listPokemonShown = useMemo(() => {
    if (nicknameInput.length >= 3) {
      const x = persistedPokemons.filter((pokemon) =>
        pokemon.nickname.includes(nicknameInput)
      );
      return x;
    }
    return persistedPokemons;
  }, [nicknameInput, persistedPokemons]);

  const handleSearchNickname = (e) => {
    setNicknameInput(e.target.value);
  };

  if (!listPokemonShown?.length && !nicknameInput) {
    return (
      <div>
        <Typography
          variant="h2"
          className={clsx(marginTopXxl, marginBottomXxl, textAlignCenter)}
        >
          You haven't catched any Pokémon.
        </Typography>

        <Button
          id="mylist-catch-button"
          className={css`
            display: block;
            margin: 0 auto;
          `}
          onClick={() => history.push("/list")}
        >
          Catch Pokémon
        </Button>
      </div>
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
      ) : null}

      <TextBox
        id="mylist-search-input"
        className={nicknameInput && marginTopXxl}
        label="Quick Search"
        placeholder="Your Pokémon's Nickname"
        value={nicknameInput}
        onSearch={handleSearchNickname}
        helperText="Insert 3 character to trigger search"
      />

      {!listPokemonShown.length && nicknameInput.length ? (
        <Typography
          variant="h2"
          className={clsx(marginTopXxl, marginBottomXxl)}
        >
          Looks like you haven't catch {nicknameInput}?
        </Typography>
      ) : (
        <div
          className={clsx(
            marginTopMd,
            css`
              display: grid;
              grid-gap: ${SPACINGS.lg};
              grid-template-columns: repeat(2, 150px);
              justify-content: space-around;
              @media (min-width: ${BREAKPOINTS.sm}) {
                grid-template-columns: repeat(3, 160px);
              }
              @media (min-width: ${BREAKPOINTS.md}) {
                grid-template-columns: repeat(4, 200px);
              }
              @media (min-width: ${BREAKPOINTS.lg}) {
                grid-template-columns: repeat(5, 210px);
              }
            `
          )}
        >
          {listPokemonShown?.map((pokemon, index) => (
            <PokeCard
              key={index}
              type="potrait"
              url={`/profile/${pokemon.name}?img=${pokemon.imgUrl}`}
              title={pokemon.nickname || pokemon.name}
              imgUrl={pokemon.imgUrl}
              description={pokemon.name}
              className={css`
                margin: ${SPACINGS.xl} 0;
              `}
              actions={
                <Button
                  type="contained"
                  className={css`
                    margin-top: ${SPACINGS.sm};
                    width: 100%;
                    border: 1px solid ${COLORS.dark};
                    box-shadow: 1px 2px;
                    border-radius: 5px;
                    padding: ${SPACINGS.xs};
                  `}
                  onClick={() => confirmationDialog(pokemon.nickname)}
                >
                  Release
                </Button>
              }
            />
          ))}
        </div>
      )}

      {selectedPokemonToRelease && (
        <Modal
          content={`
            Are you sure you want to release ${selectedPokemonToRelease}?
          `}
        >
          <div
            className={css`
              display: flex;
              justify-content: space-between;
              & button {
                margin: ${SPACINGS.sm} 0;
              }
              & button:last-child {
                color: ${COLORS.danger};
                font-weight: bold;
              }
            `}
          >
            <Button onClick={() => releasePokemon(selectedPokemonToRelease)}>
              Yes, I'm sure
            </Button>
            <Button
              type="outline"
              onClick={() => setSelectedPokemonToRelease("")}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default withRouter(MyList);
