import SearchIcon from "../../assets/search.svg";
import * as styles from "../../styles/taskListStyles";

interface SearchBarProps {
    search: string;
    onSearchChange: (value: string) => void;
}

const SearchBar = ({ search, onSearchChange }: SearchBarProps) => {
    return (
        <div style={styles.searchContainerStyle}>
            <img src={SearchIcon} alt="Buscar" style={styles.searchIconStyle} />
            <input
                type="text"
                placeholder="Buscar tareas..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                style={styles.searchInputStyle}
            />
        </div>
    );
};

export default SearchBar;
