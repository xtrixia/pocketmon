import { Link } from "react-router-dom";
import { css } from "@emotion/css";
import clsx from "clsx";

import Typography from "./Typography";
import PokeImg from "./PokeImg";

import { COLORS } from "../root/colors";
import { SPACINGS } from "../root/spacings";
import { BREAKPOINTS } from "../root/breakpoints";
import { marginBottomXxs } from "../root/styles";

const landscape = css``;

const potrait = css`
  flex-direction: column;
  width: 150px;
`;

const landscapeImg = css`
  width: 100px;
  border-radius: 5px 0 0 5px;
  @media (min-width: ${BREAKPOINTS.sm}) {
    width: 250px;
  }
`;

const potraitImg = css`
  width: 100%;
  border-radius: 5px 5px 0 0;
`;

const customStyle = css`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  border-radius: 5px;
  text-decoration: none;
  border: 1px solid ${COLORS.dark};
  box-shadow: 2px 2px ${COLORS.dark};
`;

function PokeCard({
  isClickable,
  actions,
  className,
  description,
  imgUrl,
  title,
  totalOwned,
  type,
  url,
}) {
  let imgWidth = landscapeImg;
  let typeStyle = landscape;
  let borderRadiusStyle = "0 5px 5px 0";
  if (type === "potrait") {
    imgWidth = potraitImg;
    typeStyle = potrait;
    borderRadiusStyle = "0 0 5px 5px";
  }

  const generateContent = () => {
    return (
      <>
        <PokeImg
          img={imgUrl}
          alt={title}
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
            border-radius: ${borderRadiusStyle};
            @media (min-width: ${BREAKPOINTS.sm}) {
              padding: ${SPACINGS.lg};
            }
          `}
        >
          <Typography variant="subheading2">{title}</Typography>
          {description ? (
            generateDescriptionTag(isClickable, description, url)
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
      </>
    );
  };

  return isClickable ? (
    <Link
      to={url}
      className={clsx(
        className,
        typeStyle,
        customStyle,
        css`
          min-width: 240px;
          :hover {
            background: ${COLORS.white2};
            transition: ease 0.5s;
          }
          :active {
            box-shadow: 1px 2px ${COLORS.dark};
            transform: translateY(3px);
          }
        `
      )}
    >
      {generateContent()}
    </Link>
  ) : (
    <div className={clsx(className, typeStyle, customStyle)}>
      {generateContent()}
    </div>
  );
}

function generateDescriptionTag(isClickable, text, url) {
  return !isClickable ? (
    <Link
      to={url}
      className={clsx(
        marginBottomXxs,
        css`
          color: ${COLORS.dark};
        `
      )}
    >
      {text}
    </Link>
  ) : (
    <Typography variant="body">{text}</Typography>
  );
}

export default PokeCard;
