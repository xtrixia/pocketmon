import { Link, withRouter } from "react-router-dom";
import { css } from "@emotion/css";
import clsx from "clsx";

import Typography from "./Typography";

import { COLORS } from "../root/colors";
import { SPACINGS } from "../root/spacings";

function PokeCard({ className, title, imgUrl, totalOwned }) {
  return (
    <Link
      to={`/profile/${title}`}
      className={clsx(
        className,
        css`
          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
          display: flex;
          // box-shadow: 1px 1px 5px;
          border-radius: 5px;
          text-decoration: none;
        `
      )}
    >
      <img
        src={imgUrl}
        alt={title}
        className={css`
          width: 100px;
          background: ${COLORS.white2};

          @media (min-width: 600px) {
            width: 250px;
          }
        `}
      />
      <div
        className={css`
          flex-grow: 1;
          padding: ${SPACINGS.md};
          background: ${COLORS.white};
          display: flex;
          justify-content: center;
          flex-direction: column;

          @media (min-width: 600px) {
            padding: ${SPACINGS.lg};
          }
        `}
      >
        <Typography
          variant="h4"
          className={css`
            font-family: "Lora", serif;
            color: ${COLORS.dark};
          `}
        >
          {title}
        </Typography>
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
