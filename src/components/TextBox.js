import { css } from "@emotion/css";
import clsx from "clsx";

import { COLORS } from "../root/colors";
import { SPACINGS } from "../root/spacings";
import { BREAKPOINTS } from "../root/breakpoints";

function TextBox({
  id,
  isError,
  className,
  fullWidth,
  helperText,
  label,
  placeholder,
  value,
  width,
  onSearch,
}) {
  return (
    <fieldset
      className={clsx(
        className,
        css`
          display: flex;
          flex-direction: column;
        `
      )}
    >
      <label
        htmlFor={id}
        className={css`
          padding-left: ${SPACINGS.sm};
          padding-bottom: ${SPACINGS.xxs};
          font-size: 1.25rem;
          @media (min-width: ${BREAKPOINTS.sm}) {
            font-size: 2rem;
          }
        `}
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        placeholder={placeholder}
        className={css`
          width: ${fullWidth ? "100%" : width ? width : "auto"};
          font-family: Karla, sans-serif;
          border: 1px solid ${COLORS.dark};
          border-radius: 2rem;
          box-shadow: 1px 2px;
          padding: ${SPACINGS.xs} ${SPACINGS.sm};
          font-size: 1.25rem;
          @media (min-width: ${BREAKPOINTS.sm}) {
            font-size: 2rem;
          }
        `}
        value={value}
        onChange={onSearch}
      />
      <span
        className={css`
          padding: ${SPACINGS.xxs} ${SPACINGS.sm};
          color: ${isError ? COLORS.danger : COLORS.others};
          font-size: 1rem;
          @media (min-width: ${BREAKPOINTS.sm}) {
            font-size: 1.25rem;
          }
        `}
      >
        {helperText}
      </span>
    </fieldset>
  );
}
export default TextBox;
