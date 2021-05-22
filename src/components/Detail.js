import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { css } from "@emotion/css";
import { withRouter } from "react-router-dom";
import clsx from "clsx";

import PokeLabel from "../ui_palette/PokeLabel";
import PokeImg from "../ui_palette/PokeImg";
import ProgressBar from "../ui_palette/ProgressBar";
import Typography from "../ui_palette/Typography";
import TextBox from "../ui_palette/TextBox";
import Overlay from "../ui_palette/Overlay";
import Button from "../ui_palette/Button";
import CloseCircleSVG from "../assets/close-circle.svg";
import GotchaSVG from "../assets/gotcha.svg";
import FootprintsSVG from "../assets/footprints.svg";

import { GET_POKEMON_BY_NAME, GET_ABILITY_INFO } from "../graphql/queries";
import { BREAKPOINTS } from "../root/breakpoints";
import { SPACINGS } from "../root/spacings";
import { COLORS } from "../root/colors";

import {
  fontBold,
  marginBottomMd,
  marginBottomXxl,
  marginRightMd,
} from "../root/styles";
import { generateGotchaPossibility } from "../helpers";

const sectionTypes = css`
  display: flex;
  flex-direction: row;
`;

const sectionMoves = css`
  display: grid;
  grid-gap: ${SPACINGS.sm};
  grid-template-columns: repeat(2, 100px);
  justify-content: space-between;
  margin-bottom: ${SPACINGS.md};
  & li {
    cursor: pointer;
  }
  @media (min-width: ${BREAKPOINTS.sm}) {
    grid-template-columns: repeat(5, 100px);
  }
  @media (min-width: ${BREAKPOINTS.lg}) {
    grid-template-columns: repeat(10, 100px);
    justify-content: space-around;
  }
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

  const { loading, error, data } = useQuery(GET_POKEMON_BY_NAME, {
    variables: { name: currentPokemonName },
    fetchPolicy: "cache-first",
  });

  const [getAbilityInfo, { loading: getAbilityInfoLoading }] = useLazyQuery(
    GET_ABILITY_INFO,
    {
      fetchPolicy: "cache-first",
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

  const [gotchaPossibility, setGotchaPossibility] = useState(-1);

  const catchPokemon = () => {
    const possibility = generateGotchaPossibility();

    setTimeout(() => {
      setGotchaPossibility(possibility);
    }, 200);

    setGotchaPossibility(-1);
  };
  console.log(gotchaPossibility);

  return (
    <div>
      {loading && <p>Loading...</p>}

      {error && <p>Error!</p>}

      {/* {gotchaPossibility === 0 && (
        <Overlay>
          <PokeImg src={GotchaSVG} type="small" />
          <Typography
            variant="h2"
            className={marginBottomMd}
          >{`You've got ${currentPokemonName}!`}</Typography>
          <TextBox
            fullWidth
            id="detail-nickname-input"
            label="Nickname"
            placeholder="Your Pokémon's Nickname"
          />
          <div
            className={css`
              display: flex;
              justify-content: space-between;
              & button {
                margin: ${SPACINGS.sm};
              }
              & button:first-child {
                color: ${COLORS.danger};
                font-weight: bold;
              }
            `}
          >
            <Button type="outline">Skip</Button>
            <Button>Add to my Pockétmon</Button>
          </div>
        </Overlay>
      )} */}
      
      {/* <Overlay>
        <PokeImg src={FootprintsSVG} type="small" />
        <Typography variant="h2" className={marginBottomMd}>
          They're running away...
        </Typography>
        <Button>Try again</Button>
      </Overlay> */}

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
                {data?.pokemon?.types?.map((type, index) => (
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
                {data?.pokemon?.stats?.map((stats, index) => (
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
            <Typography variant="h5">
              Height: {data?.pokemon?.height}
            </Typography>
            <Typography variant="h5">
              Weight: {data?.pokemon?.weight}
            </Typography>
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
                {data?.pokemon?.abilities?.map((ability, index) => (
                  <button
                    id={`detail-${ability?.ability?.name}-anchor`}
                    onClick={() => onToggleAbilityInfo(ability?.ability?.name)}
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
                    img={CloseCircleSVG}
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
            <div className={sectionMoves}>
              {data?.pokemon?.moves?.map((move, index) => (
                <Typography variant="body" key={index}>
                  {move?.move?.name}
                </Typography>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default withRouter(Detail);
