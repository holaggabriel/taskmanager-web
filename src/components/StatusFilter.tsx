import FilterIcon from "../assets/filter.svg";
import * as styles from "../styles/taskListStyles";
import type { Task } from "../types/task";

interface StatusFilterProps {
    statusFilter: Task["status"] | "all";
    onStatusFilterChange: (value: Task["status"] | "all") => void;
}

const StatusFilter = ({ statusFilter, onStatusFilterChange }: StatusFilterProps) => {
    return (
        <div style={styles.filterContainerStyle}>
            <img src={FilterIcon} alt="Filtrar" style={styles.filterIconStyle} />
            <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value as Task["status"] | "all")}
                style={styles.filterSelectStyle}
            >
                <option value="all">Todos los estados</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    );
};

export default StatusFilter;
