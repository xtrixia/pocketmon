import { useQuery } from "@apollo/client";
import { Link, withRouter } from "react-router-dom";

import { GET_POKEMON_BY_NAME } from "../graphql/queries";

function Detail({ match }) {
  const { loading, error, data } = useQuery(GET_POKEMON_BY_NAME, {
    variables: {
      name: match.params.id,
    },
    fetchPolicy: "cache-first",
  });

  return (
    <div>
      <h1>{match.params.id}</h1>

      <Link to="/">Back</Link>

      {loading && <p>Loading...</p>}

      {error && <p>Error!</p>}

      {data && (
        <ul>
          <li>{data?.pokemon?.height}</li>

          {data?.pokemon?.abilities?.map((ability, index) => (
            <li key={index}>
              {ability?.ability?.name}, {ability?.ability?.url}
            </li>
          ))}

          {data?.pokemon?.moves?.map((move, index) => (
            <li key={index}>
              {move?.move?.name}, {move?.move?.url}
            </li>
          ))}

          {data?.pokemon?.types?.map((type, index) => (
            <li key={index}>
              {type?.type?.name}, {type?.type?.url}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default withRouter(Detail);
