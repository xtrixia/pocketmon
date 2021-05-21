import { useQuery } from "@apollo/client";
import { css } from "@emotion/css";
import { Link, withRouter } from "react-router-dom";
import clsx from "clsx";

import Typography from "../ui_palette/Typography";
import PokeLabel from "../ui_palette/PokeLabel";

import { GET_POKEMON_BY_NAME } from "../graphql/queries";
import { SPACINGS } from "../root/spacings";
import { COLORS } from "../root/colors";

const heading = css`
  padding: ${SPACINGS.md} 0;
  font-family: "Lora", serif;
`;

const subheading = css`
  padding: ${SPACINGS.md} 0;
`;

const sectionMoves = css`
  display: grid;
  grid-gap: ${SPACINGS.sm};
  grid-template-columns: repeat(3, 100px);
  margin-bottom: ${SPACINGS.md};

  & li {
    cursor: pointer;
  }
`;

const sectionStatsGrouping = css`
  display: grid;
  grid-gap: ${SPACINGS.sm};
  grid-template-columns: repeat(6, 1fr);
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

function Detail({ match }) {
  const { loading, error, data } = useQuery(GET_POKEMON_BY_NAME, {
    variables: {
      name: match.params.id,
    },
    fetchPolicy: "cache-first",
  });

  return (
    <div>
      <Typography variant="h2" className={heading}>
        {match.params.id}
      </Typography>

      {loading && <p>Loading...</p>}

      {error && <p>Error!</p>}

      {data && (
        <>
          <section>
            <Typography variant="h5">
              Height: {data?.pokemon?.height}
            </Typography>
            <Typography variant="h5">
              Weight: {data?.pokemon?.weight}
            </Typography>
          </section>

          <ul>
            {data?.pokemon?.types?.map((type, index) => (
              <li key={index}>
                <PokeLabel text={type?.type?.name} />
              </li>
            ))}

            <Typography variant="h3" className={subheading}>
              Stats
            </Typography>
            <section className={sectionStatsGrouping}>
              {data?.pokemon?.stats?.map((stats, index) => (
                <div className={sectionStats}>
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
                        height: ${80 - stats?.base_stat}px;
                        background: ${COLORS.purewhite};
                      `}
                    />
                  </div>
                  <li key={index}>{stats?.stat?.name}</li>
                </div>
              ))}
            </section>

            <Typography variant="h3" className={subheading}>
              Ability(s)
            </Typography>
            {data?.pokemon?.abilities?.map((ability, index) => (
              <li key={index}>{ability?.ability?.name}</li>
            ))}

            <Typography variant="h3" className={subheading}>
              Move(s)
            </Typography>
            <section className={sectionMoves}>
              {data?.pokemon?.moves?.map((move, index) => (
                <Link to={move?.move?.url} key={index}>
                  {move?.move?.name}
                </Link>
              ))}
            </section>
          </ul>
        </>
      )}
    </div>
  );
}

export default withRouter(Detail);
