// utils/formatScore.js
import React from "react";

// Hàm nhận điểm và trả về JSX theo mức điểm
const formatScore = (score) => {
  if (score === null || score === undefined)
    return <span className="text-muted">N/A</span>;

  let colorClass = "";
  if (score >= 8) colorClass = "text-success";
  else if (score >= 6) colorClass = "text-primary";
  else if (score >= 4) colorClass = "text-warning";
  else colorClass = "text-danger";

  return <span className={colorClass}>{score.toFixed(2)}</span>;
};

export default formatScore;
