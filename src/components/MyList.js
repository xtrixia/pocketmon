import { Link, withRouter } from "react-router-dom";

import Typography from "../ui_palette/Typography";

function MyList() {
  return (
    <>
      <Typography
        variant="h2"
      >
        800 Pokémon you have owned
      </Typography>
      <Link to="/">Back</Link>
    </>
  );
}

export default withRouter(MyList);
