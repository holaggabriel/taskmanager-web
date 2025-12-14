import { useEffect, useState } from "react";
import { fetchUsers } from "../services/userService";
import type { User } from "../types/user";
import SearchIcon from "../assets/search.svg";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsers();

        // Delay para apreciar el shimmer
        setTimeout(() => {
          setUsers(data);
          setLoading(false);
        }, 400);

      } catch (err) {
        setError("No se pudieron cargar los usuarios.");
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const SkeletonRow = () => (
    <tr>
      <td>
        <div className="shimmer-box"></div>
      </td>
      <td>
        <div className="shimmer-box"></div>
      </td>
    </tr>
  );

  return (
    <div style={{ textAlign: "left", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ position: "relative", display: "inline-block", width: "100%", marginBottom: "20px" }}>
        <img
          src={SearchIcon}
          alt="Buscar"
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "18px",
            height: "18px",
            pointerEvents: "none",
          }}
        />
        <input
          type="text"
          placeholder="Buscar usuario por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 10px 10px 36px",
            fontSize: "16px",
            width: "100%",
            borderRadius: "7px",
            border: "1px solid #ccc",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>


      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "7px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={headerCellStyle}>Nombre</th>
              <th style={headerCellStyle}>Email</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              : filteredUsers.length > 0
                ? filteredUsers.map((u) => (
                  <tr key={u.id} style={rowStyle}>
                    <td style={cellStyle}>{u.name}</td>
                    <td style={{ ...cellStyle, color: "#555" }}>{u.email}</td>
                  </tr>
                ))
                : !loading && (
                  <tr>
                    <td colSpan={2} style={cellStyle}>
                      No se encontraron usuarios.
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>

      <style>{`
        .shimmer-box {
          height: 24px;
          margin: 4px;
          border-radius: 4px;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

const headerCellStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "12px",
  fontWeight: "600",
  fontSize: "14px",
  color: "#333",
  backgroundColor: "#f9f9f9",
  borderBottom: "1px solid #e0e0e0",
};

const rowStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderBottom: "1px solid #e0e0e0",
};

const cellStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: "14px",
};

export default UserList;
