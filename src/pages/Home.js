import { css } from "@emotion/css";
import { Link } from "react-router-dom";

import Typography from "../components/Typography";

import { SPACINGS } from "../root/spacings";
import { COLORS } from "../root/colors";

const buttonStyle = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin: ${SPACINGS.xxl} 0;
  border: none;
  background: ${COLORS.none};
  color: ${COLORS.dark};
  text-decoration: none;
`;

const anchorStyle = css`
  color: ${COLORS.dark};
`;

function Home() {
  return (
    <>
      <Link to="/pocket" className={buttonStyle}>
        <img
          src="https://ik.imagekit.io/xtrixia/Pocketmon/pokeballs_zLTlXO-5_wx.svg"
          width="150px"
          height="150px"
          alt="My Pokémon list"
        />
        <Typography variant="subtitle">My Pokémon List</Typography>
      </Link>

      <Link to="/list" className={buttonStyle}>
        <img
          src="https://ik.imagekit.io/xtrixia/Pocketmon/map_b3OL-udNn.svg"
          width="150px"
          height="150px"
          alt="Catch Pokémon"
        />
        <Typography variant="subtitle">Catch Pokémon</Typography>
      </Link>

      <footer
        className={css`
          text-align: center;
        `}
      >
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/roundicons-freebies"
          title="Roundicons Freebies"
          className={anchorStyle}
        >
          Roundicons Freebies
        </a>{" "}
        from{" "}
        <a
          href="https://www.flaticon.com/"
          title="Flaticon"
          className={anchorStyle}
        >
          www.flaticon.com
        </a>
      </footer>
    </>
  );
}

export default Home;
