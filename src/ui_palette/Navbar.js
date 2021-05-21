import clsx from "clsx";
import { css } from "@emotion/css";
import { useHistory, useLocation, withRouter } from "react-router-dom";

import LeftArrowSVG from "../assets/left-arrow.svg";
import LogoSVG from "../assets/logo.svg";
import PokeBallsSVG from "../assets/pokeballs.svg";

import { COLORS } from "../root/colors";
import { SPACINGS } from "../root/spacings";
import { BREAKPOINTS } from "../root/breakpoints";

const topHeader = css`
  background: ${COLORS.terniary};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;
  padding: ${SPACINGS.sm};
  @media (min-width: ${BREAKPOINTS.sm}) {
    justify-content: space-between;
  }
`;

const logo = css`
  flex-grow: 1;
  padding: 0 ${SPACINGS.xxl};
  cursor: pointer;
  @media (min-width: ${BREAKPOINTS.sm}) {
    flex-grow: 0;
    width: 350px;
  }
`;

const logoCenter = css`
  justify-content: center;
`;

const cta = css`
  width: 15%;
  @media (min-width: ${BREAKPOINTS.sm}) {
    cursor: pointer;
    width: 10%;
  }
  @media (min-width: ${BREAKPOINTS.lg}) {
    width: 5%;
  }
`;

function Navbar() {
  const history = useHistory();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <header>
      <div className={clsx(topHeader, isHomePage && logoCenter)}>
        {!isHomePage && (
          <button onClick={() => history.goBack()}>
            <img src={LeftArrowSVG} alt="navbar logo" width="16px" />
          </button>
        )}

        <img
          src={LogoSVG}
          alt="Pockétmon"
          width="200px"
          role="button"
          className={logo}
          onClick={() => history.push("/")}
          tabIndex={0}
        />

        {!isHomePage && (
          <img
            src={PokeBallsSVG}
            alt="My Pokémon List"
            width="45px"
            role="button"
            className={cta}
            onClick={() => history.push("/pocket")}
          />
        )}
      </div>
    </header>
  );
}
export default withRouter(Navbar);
