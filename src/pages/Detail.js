import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { css } from "@emotion/css";
import { withRouter } from "react-router-dom";
import clsx from "clsx";

import PokeLabel from "../components/PokeLabel";
import PokeImg from "../components/PokeImg";
import ProgressBar from "../components/ProgressBar";
import Typography from "../components/Typography";
import TextBox from "../components/TextBox";
import Modal from "../components/Modal";
import Button from "../components/Button";

import { GET_POKEMON_BY_NAME, GET_ABILITY_INFO } from "../graphql/queries";
import { BREAKPOINTS } from "../root/breakpoints";
import { SPACINGS } from "../root/spacings";
import { COLORS } from "../root/colors";

import {
  fontBold,
  marginBottomMd,
  marginBottomXxl,
  marginRightMd,
  marginTopXxl,
} from "../root/styles";
import { generateGotchaPossibility, useLocalStorage } from "../helpers";

const sectionTypes = css`
  display: flex;
  flex-direction: row;
`;

const stadium = css`
  border-radius: 2rem;
  background: ${COLORS.terniary};
  padding: ${SPACINGS.lg};
  margin: ${SPACINGS.md} 0;
`;

const sectionTop = css`
  display: flex;
  flex-direction: column;
  @media (min-width: ${BREAKPOINTS.md}) {
    flex-direction: row;
  }
`;

const sectionAbilityInfo = css`
  display: flex;
  & img {
    cursor: pointer;
    margin-left: auto;
    margin-bottom: auto;
  }
`;

const emptyAbilityInfo = {
  name: "",
  entry: "",
};

function Detail({ match, location }) {
  const currentPokemonName = match.params.id;

  const searchParams = new URLSearchParams(location.search);
  const currentPokemonImg = searchParams.get("img");

  const { error, data } = useQuery(GET_POKEMON_BY_NAME, {
    variables: { name: currentPokemonName },
    fetchPolicy: "cache-first",
  });

  const [getAbilityInfo, { loading: getAbilityInfoLoading }] = useLazyQuery(
    GET_ABILITY_INFO,
    {
      fetchPolicy: "cache-and-network",
      onCompleted: (res) => {
        const result = res?.ability?.response?.effect_entries;
        const findResultEN = result.find(
          (entry) => entry.language.name === "en"
        );
        setToggleAbilityInfo({
          ...toggleAbilityInfo,
          entry: findResultEN.effect,
        });
      },
    }
  );

  const [toggleAbilityInfo, setToggleAbilityInfo] = useState(emptyAbilityInfo);

  const onToggleAbilityInfo = (abilityName) => {
    setToggleAbilityInfo({ ...toggleAbilityInfo, name: abilityName });
    getAbilityInfo({
      variables: { ability: abilityName },
    });
  };

  const closeToggleAbilityInfo = () => {
    setToggleAbilityInfo(emptyAbilityInfo);
  };

  const [gotchaPossibility, setGotchaPossibility] = useState(3);

  const [nickname, setNickname] = useState("");

  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState({
    info: undefined,
    error: false,
  });

  const [persistedPokemons, setPersistedPokemons] = useLocalStorage(
    "pokemons",
    []
  );

  const catchPokemon = () => {
    setGotchaPossibility(-1);
    setTimeout(() => {
      const possibility = generateGotchaPossibility();
      setGotchaPossibility(possibility);
    }, 2000);
  };

  const handleInputNickname = (e) => {
    setIsNicknameDuplicate({ ...isNicknameDuplicate, error: false });
    setNickname(e.target.value);

    if (e.target.value.length < 3) {
      setIsNicknameDuplicate({
        info: "Nickname should be at least 3 characters",
        error: true,
      });
    }
  };

  const handleCloseModal = () => {
    setNickname("");
    setGotchaPossibility(3);
  };

  const handleAddToMyPocket = () => {
    const currentPocket = [...persistedPokemons];
    currentPocket.push({
      name: currentPokemonName,
      nickname: nickname || currentPokemonName,
      imgUrl: currentPokemonImg,
    });
    setPersistedPokemons(currentPocket);
    handleCloseModal();
  };

  const handleValidateNickname = () => {
    let checkInputNickname = -1;
    if (!nickname) {
      checkInputNickname = persistedPokemons.findIndex(
        (pocket) => pocket.nickname === currentPokemonName
      );
    } else {
      checkInputNickname = persistedPokemons.findIndex(
        (pocket) => pocket.nickname === nickname
      );
    }

    if (checkInputNickname !== -1) {
      setIsNicknameDuplicate({
        info: `You already named ${
          nickname || currentPokemonName
        } for your other Pokémon`,
        error: true,
      });
    } else handleAddToMyPocket();
  };

  const generateModal = (state) => {
    switch (state) {
      case 0:
        return (
          <Modal>
            <div
              className={css`
                position: relative;
              `}
            >
              <PokeImg
                src="https://ik.imagekit.io/xtrixia/Pocketmon/gotcha_-Qs1Xicm6.svg"
                type="small"
              />
              <button
                className={css`
                  position: absolute;
                  right: 0;
                `}
                onClick={handleCloseModal}
              >
                <PokeImg
                  img="https://ik.imagekit.io/xtrixia/Pocketmon/close-circle_8HdsOq3Bi.svg"
                  type="xsmall"
                  alt="Close modal"
                  role="button"
                />
              </button>
            </div>
            <Typography
              variant="h2"
              className={marginBottomMd}
            >{`You've got ${currentPokemonName}!`}</Typography>
            <TextBox
              id="detail-nickname-input"
              label="Nickname"
              placeholder="Your Pokémon's Nickname"
              value={nickname}
              onSearch={handleInputNickname}
              isError={isNicknameDuplicate}
              helperText={isNicknameDuplicate.error && isNicknameDuplicate.info}
            />
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
              <Button onClick={handleValidateNickname}>Add to my pocket</Button>
              <Button type="outline" onClick={handleCloseModal}>
                Skip
              </Button>
            </div>
          </Modal>
        );
      case 1:
        return (
          <Modal>
            <div
              className={css`
                position: relative;
              `}
            >
              <PokeImg
                src="https://ik.imagekit.io/xtrixia/Pocketmon/footprints_jLOnbZUJAFM.svg"
                type="small"
              />
              <button
                className={css`
                  position: absolute;
                  right: 0;
                `}
                onClick={handleCloseModal}
              >
                <PokeImg
                  img="https://ik.imagekit.io/xtrixia/Pocketmon/close-circle_8HdsOq3Bi.svg"
                  alt="Close modal"
                  role="button"
                  type="xsmall"
                />
              </button>
            </div>
            <Typography variant="h2" className={marginBottomMd}>
              They're running away...
            </Typography>
            <Button
              onClick={() => {
                setGotchaPossibility(-1);
                setTimeout(() => {
                  catchPokemon();
                }, 200);
              }}
            >
              Try to catch another
            </Button>
          </Modal>
        );
      case -1:
        return (
          <Modal transparent>
            <PokeImg
              type="small"
              className={css`
                margin: 0 auto;
                display: block;
                animation-iteration-count: infinite;
                animation-name: bounce;
                animation-duration: 3s;
                @keyframes bounce {
                  0% {
                    transform: translateY(0);
                  }
                  50% {
                    transform: translateY(-25px);
                  }
                }
              `}
              img="https://ik.imagekit.io/xtrixia/Pocketmon/open-pokeball_59laxoYbE.svg"
            />
          </Modal>
        );
      default:
        return null;
    }
  };

  if (error) {
    <Typography variant="h2" className={marginTopXxl}>
      There's something's wrong...
    </Typography>;
  }

  if (data) {
    const { height, weight, types, stats, abilities, moves } = data?.pokemon;

    return (
      <div
        className={css`
          padding: ${SPACINGS.sm} ${SPACINGS.lg};
        `}
      >
        {generateModal(gotchaPossibility)}

        {data && (
          <>
            <div className={sectionTop}>
              <div
                className={css`
                  margin-bottom: ${SPACINGS.sm};
                  @media (min-width: ${BREAKPOINTS.sm}) {
                    margin-bottom: 0;
                    margin-right: ${SPACINGS.xxl};
                  }
                `}
              >
                <PokeImg
                  img={currentPokemonImg}
                  alt={currentPokemonName}
                  type="medium"
                  className={css`
                    display: block;
                    margin: 0 auto;
                  `}
                />

                <Button fullWidth onClick={catchPokemon}>
                  <Typography variant="subtitle">
                    Catch {currentPokemonName}
                  </Typography>
                </Button>
              </div>

              <div
                className={css`
                  flex-grow: 1;
                `}
              >
                <Typography
                  variant="subheading1"
                  className={css`
                    text-align: center;
                    @media (min-width: ${BREAKPOINTS.sm}) {
                      text-align: justify;
                    }
                  `}
                >
                  {currentPokemonName}
                </Typography>

                <section
                  className={clsx(
                    sectionTypes,
                    marginBottomMd,
                    css`
                      justify-content: center;
                      @media (min-width: ${BREAKPOINTS.sm}) {
                        justify-content: flex-start;
                      }
                    `
                  )}
                >
                  {types?.map((type, index) => (
                    <PokeLabel
                      key={index}
                      text={type?.type?.name}
                      className={marginRightMd}
                    />
                  ))}
                </section>

                <dl
                  id="stats-section"
                  className={clsx(
                    marginBottomXxl,
                    css`
                      max-width: 50rem;
                    `
                  )}
                >
                  {stats?.map((stats, index) => (
                    <React.Fragment key={index}>
                      <dt>
                        <Typography
                          variant="body"
                          className={clsx(
                            fontBold,
                            css`
                              text-align: center;
                              @media (min-width: ${BREAKPOINTS.sm}) {
                                text-align: justify;
                              }
                            `
                          )}
                        >
                          {stats?.stat?.name}
                        </Typography>
                      </dt>
                      <dd>
                        <ProgressBar
                          value={stats?.base_stat}
                          color={
                            stats?.stat?.name.includes("attack")
                              ? COLORS.attack
                              : COLORS.others
                          }
                        />
                      </dd>
                    </React.Fragment>
                  ))}
                </dl>
              </div>
            </div>

            <section id="detail-section" className={stadium}>
              <Typography variant="h3" className={marginBottomMd}>
                Details
              </Typography>
              <Typography variant="h5">Height: {height}</Typography>
              <Typography variant="h5">Weight: {weight}</Typography>
            </section>

            <section
              id="ability-section"
              className={clsx(
                stadium,
                toggleAbilityInfo.name &&
                  css`
                    transition: ease 0.5s;
                    background: ${COLORS.secondary};
                  `
              )}
            >
              {!toggleAbilityInfo.name ? (
                <>
                  <Typography variant="h3" className={marginBottomMd}>
                    Ability(s)
                  </Typography>
                  {abilities?.map((ability, index) => (
                    <button
                      id={`detail-${ability?.ability?.name}-anchor`}
                      onClick={() =>
                        onToggleAbilityInfo(ability?.ability?.name)
                      }
                      key={index}
                      hrefLang="en"
                      className={css`
                        font-family: Karla, sans-serif;
                        border: none;
                        display: block;
                        background: none;
                        text-decoration: underline;
                      `}
                    >
                      <Typography variant="h5">
                        {ability?.ability?.name}
                      </Typography>
                    </button>
                  ))}
                </>
              ) : (
                <>
                  <div className={sectionAbilityInfo}>
                    <Typography variant="h3" className={marginBottomMd}>
                      Ability Info
                    </Typography>
                    <PokeImg
                      img="https://ik.imagekit.io/xtrixia/Pocketmon/close-circle_8HdsOq3Bi.svg"
                      alt="Close icon"
                      role="button"
                      onClick={closeToggleAbilityInfo}
                    />
                  </div>

                  <Typography variant="h5" className={fontBold}>
                    {toggleAbilityInfo.name}
                  </Typography>

                  <Typography variant="body">
                    {getAbilityInfoLoading
                      ? "Loading..."
                      : toggleAbilityInfo.entry}
                  </Typography>
                </>
              )}
            </section>

            <section id="move-section" className={stadium}>
              <Typography variant="h3" className={marginBottomMd}>
                Move(s)
              </Typography>
              <Typography variant="h5">
                {moves?.map((move) => move?.move?.name).join(", ")}
              </Typography>
            </section>
          </>
        )}
      </div>
    );
  }

  return (
    <Typography
      variant="h2"
      className={css`
        padding: ${SPACINGS.sm} ${SPACINGS.lg};
      `}
    >
      Loading...
    </Typography>
  );
}

export default withRouter(Detail);
