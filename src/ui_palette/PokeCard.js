import { Link, withRouter } from "react-router-dom";
import { css } from "@emotion/css";
import clsx from "clsx";

import Typography from "./Typography";
import PokeImg from "./PokeImg";

import { COLORS } from "../root/colors";
import { SPACINGS } from "../root/spacings";
import { BREAKPOINTS } from "../root/breakpoints";

const landscape = css``;

const potrait = css`
  flex-direction: column;
  width: 125px;
  @media (min-width: ${BREAKPOINTS.sm}) {
  }
`;

const landscapeImg = css`
  width: 100px;
  @media (min-width: ${BREAKPOINTS.sm}) {
    width: 250px;
  }
`;

const potraitImg = css`
  width: 100%;
`;

function PokeCard({
  actions,
  className,
  description,
  imgUrl,
  title,
  totalOwned,
  type,
  url,
}) {
  let typeStyle = landscape;
  let imgWidth = landscapeImg;
  if (type === "potrait") {
    typeStyle = potrait;
    imgWidth = potraitImg;
  }

  return (
    <Link
      to={url}
      className={clsx(
        className,
        typeStyle,
        css`
          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
          display: flex;
          border-radius: 5px;
          text-decoration: none;
        `
      )}
    >
      <PokeImg
        img={imgUrl}
        alt={title}
        type="small"
        className={imgWidth}
        background={COLORS.white2}
      />
      <div
        className={css`
          flex-grow: 1;
          padding: ${SPACINGS.md};
          background: ${COLORS.white};
          display: flex;
          justify-content: center;
          flex-direction: column;
          @media (min-width: ${BREAKPOINTS.sm}) {
            padding: ${SPACINGS.lg};
          }
        `}
      >
        <Typography variant="subheading2">{title}</Typography>
        {description ? (
          description
        ) : (
          <Typography
            variant="body"
            className={css`
              color: ${COLORS.dark};
            `}
          >
            You've owned: {totalOwned}
          </Typography>
        )}
        {actions}
      </div>
    </Link>
  );
}

export default withRouter(PokeCard);
