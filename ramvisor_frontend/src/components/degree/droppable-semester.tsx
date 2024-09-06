import { useSortable } from "@dnd-kit/sortable";
import { Class } from "@graphql/generated/graphql";
import React, { useState } from "react";

type Props = {
  semester: Semester;
  children: React.ReactNode;
};

export interface Semester {
  id: string;
  name: string;
  courses: Class[];
  credits: number;
}

const DroppableSemester = ({
  semester,
  children,
}: React.PropsWithChildren<Props>) => {
  const [activeSemester, setActiveSemester] = useState<string | null>(null);

  const { setNodeRef } = useSortable({
    id: semester.id,
    data: {
      type: "semester",
      semester: semester,
    },
  });

  const isActive = activeSemester === semester.id;
  const isOverCreditLimit = semester.credits > 18;

  return (
    <div
      ref={setNodeRef}
      style={{
        padding: "12px",
        borderRadius: "8px",
        minHeight: "320px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        transition: "background-color 0.2s",
        backgroundColor: isActive ? "#dbeafe" : "white",
        border: "1px solid #bfdbfe",
      }}
    >
      <h3
        style={{
          marginBottom: "8px",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "14px",
          padding: "8px 0",
          borderRadius: "4px",
          backgroundColor: "#bfdbfe",
          color: "#1e40af",
        }}
      >
        {semester.name}
      </h3>
      <p
        style={{
          textAlign: "center",
          fontSize: "12px",
          marginBottom: "8px",
          color: isOverCreditLimit ? "#dc2626" : "#2563eb",
          fontWeight: isOverCreditLimit ? "bold" : "normal",
        }}
      >
        Credits: {semester.credits}
      </p>
      {isOverCreditLimit && (
        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#dc2626",
            fontWeight: "bold",
            marginBottom: '8px',
          }}
        >
          Maximum credits (18) exceeded!
        </p>
      )};
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {children}
      </div>
    </div>
  );
};

export default DroppableSemester;
