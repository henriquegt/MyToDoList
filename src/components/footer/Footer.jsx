import React from "react";

export function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <p style={{}}>
        &copy;{new Date().getFullYear()} Todos os direitos reservados a Henrique
        Reis
      </p>
    </footer>
  );
}
