import clsx from "clsx";
import { css } from "@emotion/css";
import { useHistory, useLocation, withRouter } from "react-router-dom";

import Button from "./Button";

import { COLORS } from "../root/colors";
import { SPACINGS } from "../root/spacings";
import { BREAKPOINTS } from "../root/breakpoints";

const topHeader = css`
  background: ${COLORS.terniary};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;
  padding: ${SPACINGS.sm} ${SPACINGS.lg};
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
  const isMyPokemonListPage = location.pathname === "/pocket";

  const handleRoute = () => {
    const currentPath = location.pathname;
    switch (currentPath) {
      case "/pocket":
        history.goBack();
        break;
      case "/list":
        history.push("/");
        break;
      default:
        history.push("/list");
        break;
    }
  };

  return (
    <header
      className={css`
        position: sticky;
        top: 0;
        z-index: 1;
        @media (min-width: ${BREAKPOINTS.md}) {
          max-width: ${BREAKPOINTS.md};
          margin: 0 auto;
        }
      `}
    >
      <div className={clsx(topHeader, isHomePage && logoCenter)}>
        {!isHomePage && (
          <Button onClick={handleRoute}>
            <img
              src="https://ik.imagekit.io/xtrixia/Pocketmon/left-arrow_J_B2Zp65M.svg"
              alt="Left arrow"
              width="16px"
              height="16px"
            />
          </Button>
        )}

        <img
          loading="lazy"
          src="https://ik.imagekit.io/xtrixia/PoCKéTMoN_K8wj-F3Wm.png"
          srcSet="https://ik.imagekit.io/xtrixia/PoCKéTMoN_K8wj-F3Wm.png 200w,
          https://ik.imagekit.io/xtrixia/PoCKéTMoN_K8wj-F3Wm.png 400w"
          sizes="(max-width: 400px) 200px,
            400px"
          alt="Pockétmon logo"
          width="200px"
          height="80px"
          role="button"
          className={clsx(
            logo,
            css`
              margin: ${isMyPokemonListPage && "0 auto"};
            `
          )}
          onClick={() => history.push("/")}
          tabIndex={0}
        />

        {!isHomePage && !isMyPokemonListPage && (
          <img
            src="https://ik.imagekit.io/xtrixia/Pocketmon/pokeballs_zLTlXO-5_wx.svg"
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
