import { css } from "@emotion/css";

import { COLORS } from "../root/colors";

function ProgressBar({ value, color }) {
  return (
    <div
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={css`
        width: 100%;
        height: 1rem;
        position: relative;
        overflow: hidden;
        background: ${COLORS.white2};
        :before {
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          content: "";
          background: ${color};
          left: -${100 - value}%;
        }
      `}
      role="progressbar"
    />
  );
}

export default ProgressBar;
