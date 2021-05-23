import { css } from "@emotion/css";
import clsx from "clsx";

import { SPACINGS } from "../root/spacings";
import { COLORS } from "../root/colors";

function Button({ children, className, fullWidth, type, ...props }) {
  return (
    <button
      className={clsx(
        className,
        css`
          width: ${fullWidth ? "100%" : "fit-content"};
          padding: ${SPACINGS.xs};
          background: ${type === "outline" ? "none" : COLORS.white};
          box-shadow: ${type === "outline" ? 0 : "2px 2px"};
          border-radius: 5px;
          border: ${type === "outline" ? "none" : `1px solid ${COLORS.dark}`};
          :hover {
            background: ${COLORS.white2};
            transition: ease 0.5s;
          }
          :active {
            box-shadow: 1px 2px;
            transform: translateY(3px);
          }
        `
      )}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
