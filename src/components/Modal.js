import { css } from "@emotion/css";

import Typography from "./Typography";

import { COLORS } from "../root/colors";
import { SPACINGS } from "../root/spacings";
import { BREAKPOINTS } from "../root/breakpoints";

function Modal({ content, children, transparent }) {
  return (
    <div
      className={css`
        justify-content: center;
        position: fixed;
        background: rgba(0, 0, 0, 0.75);
        width: 100vw;
        height: 100vh;
        z-index: 1000;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        className={css`
          border-radius: 2rem;
          background: ${transparent ? "none" : COLORS.primary};
          padding: ${SPACINGS.lg};
          margin: ${SPACINGS.md};
          @media (min-width: ${BREAKPOINTS.sm}) {
            width: 500px;
            align-self: center;
          }
        `}
      >
        {content && <Typography variant="h2">{content}</Typography>}
        {children}
      </div>
    </div>
  );
}
export default Modal;
