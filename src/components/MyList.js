import { Link, withRouter } from "react-router-dom";
import { css } from "@emotion/css";

import Typography from "../ui_palette/Typography";

import { SPACINGS } from "../root/spacings";

const heading = css`
  padding: ${SPACINGS.md} 0;
`;

function MyList() {
  return (
    <>
      <Typography variant="h2" className={heading}>
        800 Pokémon you have owned
      </Typography>
      <Link to="/">Back</Link>
    </>
  );
}

export default withRouter(MyList);
