import { css } from "@emotion/css";

import Navbar from "./Navbar";

import { BREAKPOINTS } from "../root/breakpoints";
import { SPACINGS } from "../root/spacings";

function Container({ children }) {
  return (
    <div
      className={css`
        margin: 0 auto;
        padding: 0 ${SPACINGS.xxl};

        @media (min-width: ${BREAKPOINTS.md}) {
          max-width: ${BREAKPOINTS.md};
        }

        @media (min-width: ${BREAKPOINTS.lg}) {
          max-width: ${BREAKPOINTS.lg};
        }
      `}
    >
      <Navbar />

      {children}
    </div>
  );
}

export default Container;
