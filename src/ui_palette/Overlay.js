import { css } from "@emotion/css";
import Typography from "./Typography";

function Overlay({ content, children }) {
  return (
    <div
      className={css`
        justify-content: center;
        position: fixed;
        background: white;
        width: 100%;
        z-index: 1;
        left: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      <Typography variant="h2">{content}</Typography>
      {children}
    </div>
  );
}
export default Overlay;
