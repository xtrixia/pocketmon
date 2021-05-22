import { css } from "@emotion/css";
import clsx from "clsx";

import { BREAKPOINTS } from "../root/breakpoints";

const xsmall = css`
  width: 25px;
  @media (min-width: ${BREAKPOINTS.sm}) {
    width: 50px;
  }
`;

const small = css`
  width: 100px;
  @media (min-width: ${BREAKPOINTS.sm}) {
    width: 250px;
  }
`;

const medium = css`
  width: 250px;
  @media (min-width: ${BREAKPOINTS.sm}) {
    width: 300px;
  }
  @media (min-width: ${BREAKPOINTS.lg}) {
    width: 350px;
  }
`;

const large = css`
  width: 350px;
`;

function PokeImg({ alt, background, className, img, type, ...props }) {
  let imgType = "";

  switch (type) {
    case "small":
      imgType = small;
      break;
    case "medium":
      imgType = medium;
      break;
    case "large":
      imgType = large;
      break;
    default:
      imgType = xsmall;
      break;
  }
  return (
    <img
      src={img}
      alt={alt}
      className={clsx(
        [imgType],
        className,
        css`
          background: ${background};
        `
      )}
      {...props}
    />
  );
}

export default PokeImg;
