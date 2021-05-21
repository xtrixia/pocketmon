import { css } from "@emotion/css";
import clsx from "clsx";

import Typography from "./Typography";

import { COLORS } from "../root/colors";
import { SPACINGS } from "../root/spacings";

const labelStyle = css`
  padding: ${SPACINGS.xxs};
  border-radius: 2rem;
  text-align: center;
  min-width: 4rem;
  width: fit-content;
`;

function PokeLabel({ text }) {
  return (
    <Typography
      variant="subtitle"
      className={clsx(
        labelStyle,
        css`
          background: ${COLORS[text] || COLORS.normal};
        `
      )}
    >
      {text}
    </Typography>
  );
}
export default PokeLabel;
