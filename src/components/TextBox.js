import { css } from "@emotion/css";
import { COLORS } from "../root/colors";
import { SPACINGS } from "../root/spacings";

function TextBox({
  id,
  fullWidth,
  label,
  placeholder,
  value,
  width,
  onSearch,
}) {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <label
        htmlFor={id}
        className={css`
          padding-left: ${SPACINGS.sm};
          padding-bottom: ${SPACINGS.xxs};
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
        `}
        value={value}
        onChange={onSearch}
      />
    </div>
  );
}
export default TextBox;
