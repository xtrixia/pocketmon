import { withRouter } from "react-router-dom";
import { css } from "@emotion/css";

import Typography from "../ui_palette/Typography";
import TextBox from "../ui_palette/TextBox";

import { SPACINGS } from "../root/spacings";

import { useLocalStorage } from "../helpers";

const heading = css`
  padding: ${SPACINGS.md} 0;
`;

function MyList() {
  const [persistedPokemons] = useLocalStorage("pokemons", []);

  return (
    <>
      <Typography variant="h2" className={heading}>
        {persistedPokemons?.length} Pokémon(s) you have owned.
      </Typography>

      <TextBox
        id="mylist-search-input"
        label="Quick Search"
        placeholder="Your Pokémon's Nickname"
        // value={nickname}
        // onSearch={handleInputNickname}
      />
    </>
  );
}

export default withRouter(MyList);
