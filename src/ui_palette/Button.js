import { css } from "@emotion/css";

import { SPACINGS } from "../root/spacings";
import { COLORS } from "../root/colors";

function Button({ children, fullWidth, type, ...props }) {
  let borderStyle = `1px solid ${COLORS.dark}`;
  let backgroundStyle = COLORS.white;
  let boxShadowStyle = "1px 2px";
  if (type === "outline") {
    borderStyle = "none";
    backgroundStyle = "none";
    boxShadowStyle = 0;
  }

  return (
    <button
      className={css`
        width: ${fullWidth ? "100%" : "fit-content"};
        padding: ${SPACINGS.xxs};
        background: ${backgroundStyle};
        box-shadow: ${boxShadowStyle};
        border-radius: 5px;
        border: ${borderStyle};
      `}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
