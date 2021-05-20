import clsx from "clsx";
import { css } from "@emotion/css";

function Typography({ className, variant, ...props }) {
  let Component = generateTag(variant);

  return (
    <Component
      className={clsx(
        className,
        css`
          ${generateStyle(variant)}
        `
      )}
      {...props}
    />
  );
}

function generateStyle(variant) {
  switch (variant) {
    case "h1":
      return {
        fontWeight: 300,
        fontSize: "6rem",
        lineHeight: 1.167,
        letterSpacing: "-0.01562em",
      };
    case "h2":
      return {
        fontWeight: 300,
        fontSize: "3.75rem",
        lineHeight: 1.2,
        letterSpacing: "-0.00833em",
      };
    case "h3":
      return {
        fontWeight: 300,
        fontSize: "3rem",
        lineHeight: 1.167,
        letterSpacing: 0,
      };
    case "h4":
      return {
        fontWeight: 400,
        fontSize: "2.125rem",
        lineHeight: 1.235,
        letterSpacing: "0.00735",
      };
    case "h5":
      return {
        fontWeight: 400,
        fontSize: "1.5rem",
        lineHeight: 1.334,
        letterSpacing: 0,
      };
    case "h6":
      return {
        fontWeight: 500,
        fontSize: "1.25rem",
        lineHeight: 1.6,
        letterSpacing: "0.0075em",
      };
    case "subtitle":
      return {
        fontWeight: 400,
        fontSize: "1rem",
        lineHeight: 1.75,
        letterSpacing: "0.00938em",
      };
    default:
      return {
        fontWeight: 400,
        fontSize: "1rem",
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      };
  }
}

function generateTag(variant) {
  const variants = ["h1", "h2", "h3", "h4", "h5", "h6"];
  return variants.includes(variant) ? variant : "p";
}

export default Typography;
