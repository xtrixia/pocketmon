import { css } from "@emotion/css";
import { COLORS } from "../root/colors";
import { SPACINGS } from "../root/spacings";

function SearchBar({ value, onSearch }) {
  return (
    <input
      type="search"
      placeholder="Search Pokémon"
      className={css`
        width: 100%;
        font-family: Karla, sans-serif;
        border: 1px solid ${COLORS.primary};
        border-radius: 2rem;
        box-shadow: 1px 2px ${COLORS.primary};
        padding: ${SPACINGS.xs} ${SPACINGS.sm};
      `}
      value={value}
      onClick={onSearch}
    />
  );
}
export default SearchBar;
