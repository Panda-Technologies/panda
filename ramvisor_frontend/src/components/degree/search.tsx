import { Class } from "@app/degree/page";
import React from "react";

type Props = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DegreeSearch = ({ handleSearch }: Props) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<Class[]>([]);
  return (
    <div
      style={{
        width: "20%",
        padding: "16px",
        backgroundColor: "white",
        overflowY: "auto",
        borderRight: "1px solid #e5e7eb",
      }}
    >
      <input
        type="text"
        placeholder="Search for courses"
        value={searchTerm}
        onChange={handleSearch}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "16px",
          borderRadius: "4px",
          border: "1px solid #d1d5db",
          backgroundColor: "white",
          color: "#111827",
        }}
      />
      <div style={{ marginBottom: '8px', color: '#4B5563' }}>
        Total items: {searchResults.length}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        {searchResults.map((course) => (
            <SortableCourse />
        ))}
      </div>
    </div>
  );
};

export default DegreeSearch;
