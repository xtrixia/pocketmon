/**
 * @todo
 * [ ] catch pokemon possibility rate up to 50%
 */
import { useQuery } from "@apollo/client";
import { css } from "@emotion/css";
import { Link, withRouter } from "react-router-dom";
import clsx from "clsx";

import Typography from "../ui_palette/Typography";
import PokeLabel from "../ui_palette/PokeLabel";
import PokeImg from "../ui_palette/PokeImg";
import OpenPokeballSVG from "../assets/open-pokeball.svg";

import { GET_POKEMON_BY_NAME } from "../graphql/queries";
import { BREAKPOINTS } from "../root/breakpoints";
import { SPACINGS } from "../root/spacings";
import { COLORS } from "../root/colors";

import {
  fontBold,
  marginBottomMd,
  marginBottomXxl,
  marginRightMd,
  textAlignCenter,
} from "../root/styles";

const sectionTypes = css`
  display: flex;
  flex-direction: row;
`;

const sectionMoves = css`
  display: grid;
  grid-gap: ${SPACINGS.sm};
  grid-template-columns: repeat(3, 100px);
  margin-bottom: ${SPACINGS.md};
  & li {
    cursor: pointer;
  }
  @media (min-width: ${BREAKPOINTS.sm}) {
    grid-template-columns: repeat(5, 100px);
  }
  @media (min-width: ${BREAKPOINTS.lg}) {
    grid-template-columns: repeat(10, 100px);
  }
`;

const sectionStatsGrouping = css`
  display: grid;
  grid-gap: ${SPACINGS.sm};
  grid-template-columns: repeat(6, 45px);
  @media (min-width: ${BREAKPOINTS.sm}) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const sectionStats = css`
  display: grid;
  grid-gap: ${SPACINGS.xxs};
  grid-template-rows: 80px 20px;
`;

const statsBar = css`
  height: 100%;
  border: 1px solid ${COLORS.purewhite};
`;

const cta = css`
  background: ${COLORS.none};
  border: none;
  position: relative;
  left: 30%;
  cursor: pointer;
  @media (min-width: ${BREAKPOINTS.sm}) {
    left: 40%;
  }
  @media (min-width: ${BREAKPOINTS.md}) {
    left: 45%;
  }
  @media (min-width: ${BREAKPOINTS.lg}) {
    position: unset;
  }
`;

const ctaLogo = css`
  width: 15%;
  border-radius: 50%;
  background: ${COLORS.primary};
  padding: ${SPACINGS.sm};
  @media (min-width: ${BREAKPOINTS.sm}) {
    cursor: pointer;
    width: 20%;
  }
  @media (min-width: ${BREAKPOINTS.lg}) {
    width: 50%;
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

function Detail({ match, location }) {
  const currentPokemonName = match.params.id;

  const searchParams = new URLSearchParams(location.search);
  const currentPokemonImg = searchParams.get("img");

  const { loading, error, data } = useQuery(GET_POKEMON_BY_NAME, {
    variables: {
      name: currentPokemonName,
    },
    fetchPolicy: "cache-first",
  });

  return (
    <div>
      {loading && <p>Loading...</p>}

      {error && <p>Error!</p>}

      {data && (
        <>
          <div className={sectionTop}>
            <div>
              <PokeImg
                img={currentPokemonImg}
                alt={currentPokemonName}
                type="medium"
                className={css`
                  display: block;
                  margin: 0 auto;
                `}
              />

              <button id="detail-catch-button" className={cta}>
                <img
                  src={OpenPokeballSVG}
                  alt="Open pokeball"
                  className={ctaLogo}
                />
                <Typography variant="subtitle">
                  Catch {currentPokemonName}
                </Typography>
              </button>
            </div>

            <div>
              <Typography variant="subheading1">
                {currentPokemonName}
              </Typography>

              <section className={clsx(sectionTypes, marginBottomMd)}>
                {data?.pokemon?.types?.map((type, index) => (
                  <PokeLabel
                    key={index}
                    text={type?.type?.name}
                    className={marginRightMd}
                  />
                ))}
              </section>

              <section id="stats-section" className={marginBottomXxl}>
                <section className={sectionStatsGrouping}>
                  {data?.pokemon?.stats?.map((stats, index) => (
                    <div className={sectionStats} key={index}>
                      <div
                        className={clsx(
                          statsBar,
                          css`
                            background: ${stats?.stat?.name.includes("attack")
                              ? COLORS.attack
                              : COLORS.others};
                          `
                        )}
                      >
                        <div
                          className={css`
                            height: ${100 - stats?.base_stat}px;
                            background: ${COLORS.purewhite};
                          `}
                        />
                      </div>

                      <Typography
                        variant="body"
                        className={clsx(textAlignCenter, fontBold)}
                      >
                        {stats?.stat?.name}
                      </Typography>
                    </div>
                  ))}
                </section>
              </section>
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

          <ul>
            <section id="ability-section" className={stadium}>
              <Typography variant="h3" className={marginBottomMd}>
                Ability(s)
              </Typography>
              {data?.pokemon?.abilities?.map((ability, index) => (
                <li key={index}>
                  <Typography variant="h5">{ability?.ability?.name}</Typography>
                </li>
              ))}
            </section>

            <section id="move-section" className={stadium}>
              <Typography variant="h3" className={marginBottomMd}>
                Move(s)
              </Typography>
              <div className={sectionMoves}>
                {data?.pokemon?.moves?.map((move, index) => (
                  <Link to={move?.move?.url} key={index}>
                    {move?.move?.name}
                  </Link>
                ))}
              </div>
            </section>
          </ul>
        </>
      )}
    </div>
  );
}

export default withRouter(Detail);
