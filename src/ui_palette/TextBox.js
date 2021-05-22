import { css } from "@emotion/css";
import { COLORS } from "../root/colors";
import { SPACINGS } from "../root/spacings";

function SearchBar({ id, fullWidth, label, placeholder, value, onSearch }) {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <label
        for={id}
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
          width: ${fullWidth ? "100%" : "fit-content"};
          font-family: Karla, sans-serif;
          border: 1px solid ${COLORS.dark};
          border-radius: 2rem;
          box-shadow: 1px 2px;
          padding: ${SPACINGS.xs} ${SPACINGS.sm};
        `}
        value={value}
        onClick={onSearch}
      />
    </div>
  );
}
export default SearchBar;
