import { css } from "@emotion/css";

import Navbar from "./Navbar";

import { BREAKPOINTS } from "../root/breakpoints";

function Container({ children }) {
  return (
    <>
      <Navbar />
      <div
        className={css`
          margin: 0 auto;
          @media (min-width: ${BREAKPOINTS.md}) {
            max-width: ${BREAKPOINTS.md};
          }
        `}
      >
        {children}
      </div>
    </>
  );
}

export default Container;
