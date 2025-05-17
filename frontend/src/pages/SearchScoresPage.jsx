import React, { useEffect, useState } from "react";
import styles from "./SearchScoresPage.module.css";
import formatScore from "../utils/FormatScore";
import scoreService from "../services/scoreService";

export default function SearchScoresPage() {
  const [regNumber, setRegNumber] = useState("");
  const [student, setStudent] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize the database on component mount
  useEffect(() => {
    const initDb = async () => {
      // Set initialized to true after component mounts
      setInitialized(true);
    };
    initDb();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!regNumber.trim()) {
      return;
    }

    setLoading(true);

    try {
      const result = await scoreService.getScoreByRegStudent(regNumber);

      if (result && result.success && result.student) {
        // Transform API response to match component structure
        const studentData = {
          sbd: result.student.registration_number,
          ma_ngoai_ngu: result.student.language,
          toan: parseFloat(result.student.scores.Mathematics) || null,
          ngu_van: parseFloat(result.student.scores.Literature) || null,
          ngoai_ngu:
            parseFloat(result.student.scores["Foreign Language"]) || null,
          vat_li: parseFloat(result.student.scores.Physics) || null,
          hoa_hoc: parseFloat(result.student.scores.Chemistry) || null,
          sinh_hoc: parseFloat(result.student.scores.Biology) || null,
          lich_su: parseFloat(result.student.scores.History) || null,
          dia_li: parseFloat(result.student.scores.Geography) || null,
          gdcd: parseFloat(result.student.scores["Civic Education"]) || null,

          // Add methods for group scores
          getGroupAScore: function () {
            const scores = [this.toan, this.vat_li, this.hoa_hoc].filter(
              (score) => score !== null
            );
            return scores.length > 0
              ? scores.reduce((sum, score) => sum + score, 0) / scores.length
              : null;
          },
          getGroupBScore: function () {
            const scores = [this.toan, this.hoa_hoc, this.sinh_hoc].filter(
              (score) => score !== null
            );
            return scores.length > 0
              ? scores.reduce((sum, score) => sum + score, 0) / scores.length
              : null;
          },
          getGroupCScore: function () {
            const scores = [this.ngu_van, this.lich_su, this.dia_li].filter(
              (score) => score !== null
            );
            return scores.length > 0
              ? scores.reduce((sum, score) => sum + score, 0) / scores.length
              : null;
          },
          getGroupDScore: function () {
            const scores = [this.toan, this.ngu_van, this.ngoai_ngu].filter(
              (score) => score !== null
            );
            return scores.length > 0
              ? scores.reduce((sum, score) => sum + score, 0) / scores.length
              : null;
          },
        };

        setStudent(studentData);
      } else {
        setStudent(null);
      }
    } catch (error) {
      console.error("Error searching for student:", error);
      setStudent(null);
    }

    setSearched(true);
    setLoading(false);
  };

  // Get level label with color
  const getLevelLabel = (scored) => {
    if (scored === null || scored === undefined) return null;

    let levelClass = "";
    let levelText = "";

    if (scored >= 8) {
      levelClass = "bg-success";
      levelText = "Excellent";
    } else if (scored >= 6) {
      levelClass = "bg-primary";
      levelText = "Good";
    } else if (scored >= 4) {
      levelClass = "bg-warning";
      levelText = "Average";
    } else {
      levelClass = "bg-danger";
      levelText = "Below Average";
    }

    return <span className={`badge ${levelClass}`}>{levelText}</span>;
  };

  // Render subject detail row
  const renderSubjectRow = (label, score) => (
    <tr key={label}>
      <td>{label}</td>
      <td className="text-center">{formatScore(score)}</td>
      <td className="text-center">
        {score !== null ? getLevelLabel(score) : "-"}
      </td>
    </tr>
  );

  // Render group average row
  const renderGroupRow = (group, score, subjects) => (
    <tr key={`group-${group}`} className="table">
      <td>
        <strong>Group {group} Average</strong>{" "}
        <small className="text-muted">({subjects})</small>
      </td>
      <td className="text-center">
        {score !== null ? (
          <strong>{formatScore(score)}</strong>
        ) : (
          <span className="text-muted">N/A</span>
        )}
      </td>
      <td className="text-center">
        {score !== null ? getLevelLabel(score) : "-"}
      </td>
    </tr>
  );

  return (
    <div>
      <div className="my-4">
        <div className="">
          <div className="card bg-white shadow-sm p-3">
            <h2 className="mb-3">User Registration</h2>
            <p className="text-muted">
              Enter a student registration number to view detailed scores
            </p>
            <form onSubmit={handleSearch}>
              <div className={`input-group mb-3 ${styles.inputSearch}`}>
                <input
                  type="text"
                  className="form-control form-control"
                  placeholder="Enter registration number (e.g., 01000001)"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  disabled={loading || !initialized}
                />
                <button
                  className="btn btn-dark"
                  type="submit"
                  disabled={loading || !initialized}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Searching...
                    </>
                  ) : (
                    <>Submit</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {(!initialized || loading) && (
        <div className="row ">
          <div className="col-12 text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Searching for student...</p>
          </div>
        </div>
      )}

      {searched && !loading && (
        <div className="row">
          <div className="col-12">
            {student ? (
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <span className="me-2 mb-1">
                      Student results: {student.sbd}
                    </span>
                    {student.ma_ngoai_ngu && (
                      <span className="badge bg-light text-dark">
                        Foreign language: {student.ma_ngoai_ngu || "N/A"}
                      </span>
                    )}
                  </h5>
                </div>
                <div className="card-body">
                  <h6 className="mb-3 fw-bold">Detailed Scores</h6>
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Subject</th>
                          <th className="text-center" style={{ width: "6rem" }}>
                            Score
                          </th>
                          <th
                            className="text-center"
                            style={{ width: "10rem" }}
                          >
                            Level
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderSubjectRow("Mathematics", student.toan)}
                        {renderSubjectRow("Literature", student.ngu_van)}
                        {renderSubjectRow(
                          "Foreign Language",
                          student.ngoai_ngu
                        )}
                        {renderSubjectRow("Physics", student.vat_li)}
                        {renderSubjectRow("Chemistry", student.hoa_hoc)}
                        {renderSubjectRow("Biology", student.sinh_hoc)}
                        {renderSubjectRow("History", student.lich_su)}
                        {renderSubjectRow("Geography", student.dia_li)}
                        {renderSubjectRow("Civics", student.gdcd)}

                        {/* Group averages */}
                        <tr>
                          <td colSpan="3" className="bg-light">
                            <strong>Group Averages</strong>
                          </td>
                        </tr>
                        {renderGroupRow(
                          "A",
                          student?.getGroupAScore(),
                          "Math, Physics, Chemistry"
                        )}
                        {renderGroupRow(
                          "B",
                          student?.getGroupBScore(),
                          "Math, Chemistry, Biology"
                        )}
                        {renderGroupRow(
                          "C",
                          student?.getGroupCScore(),
                          "Literature, History, Geography"
                        )}
                        {renderGroupRow(
                          "D",
                          student?.getGroupDScore(),
                          "Math, Literature, Foreign Language"
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="alert alert-warning">
                <i className="fa-solid fa-triangle-exclamation me-2"></i>
                No student found with registration number:{" "}
                <strong>{regNumber}</strong>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
