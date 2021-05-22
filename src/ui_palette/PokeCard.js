import { Link, withRouter } from "react-router-dom";
import { css } from "@emotion/css";
import clsx from "clsx";

import Typography from "./Typography";
import PokeImg from "./PokeImg";

import { COLORS } from "../root/colors";
import { SPACINGS } from "../root/spacings";
import { BREAKPOINTS } from "../root/breakpoints";

function PokeCard({ className, imgUrl, title, totalOwned }) {
  return (
    <Link
      to={`/profile/${title}?img=${imgUrl}`}
      className={clsx(
        className,
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
        <Typography
          variant="body"
          className={css`
            color: ${COLORS.dark};
          `}
        >
          You've owned: {totalOwned}
        </Typography>
      </div>
    </Link>
  );
}

export default withRouter(PokeCard);
