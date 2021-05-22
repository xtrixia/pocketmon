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

const backButton = css`
  padding: ${SPACINGS.xxs};
  background: ${COLORS.white};
  box-shadow: 1px 2px;
  border-radius: 5px;
  border: 1px solid ${COLORS.dark};
`;

function Navbar() {
  const history = useHistory();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <header>
      <div className={clsx(topHeader, isHomePage && logoCenter)}>
        {!isHomePage && (
          <button className={backButton} onClick={() => history.goBack()}>
            <img src={LeftArrowSVG} alt="Left arrow" width="16px" />
          </button>
        )}

        <img
          src={LogoSVG}
          alt="Pockétmon logo"
          width="200px"
          role="button"
          className={logo}
          onClick={() => history.push("/")}
          tabIndex={0}
        />

        {!isHomePage && (
          <img
            src={PokeBallsSVG}
            alt="My Pokémon list"
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
