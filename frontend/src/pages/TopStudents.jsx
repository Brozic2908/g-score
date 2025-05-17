import React, { useEffect, useState } from "react";
import scoreService from "../services/scoreService";

// Cache to store fetched data
const dataCache = {
  topStudents: null,
};

export default function TopStudents() {
  const [topStudents, setTopStudents] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("A");
  const [loading, setLoading] = useState(true);

  // Define mapping for API responses
  const groupResponseMapping = {
    A: {
      scoreFields: ["math_score", "physics_score", "chemistry_score"],
      componentFields: ["toan", "vat_li", "hoa_hoc"],
    },
    B: {
      scoreFields: ["math_score", "chemistry_score", "biology_score"],
      componentFields: ["toan", "hoa_hoc", "sinh_hoc"],
    },
    C: {
      scoreFields: ["literature_score", "history_score", "geography_score"],
      componentFields: ["ngu_van", "lich_su", "dia_li"],
    },
    D: {
      scoreFields: ["math_score", "literature_score", "foreign_language_score"],
      componentFields: ["toan", "ngu_van", "ngoai_ngu"],
    },
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        let result;

        if (dataCache.topStudents) {
          result = dataCache.topStudents;
        } else {
          dataCache.topStudents = result = await scoreService.getTopStudent();
        }

        if (result && Array.isArray(result)) {
          // Transform API response to match component structure
          const transformedStudents = result.map((student) => {
            // Map the scores based on the selected group
            const studentData = {
              sbd: student.registration_number,
              totalScore: parseFloat(student.total_score), // Calculate average from total
            };

            // Map API fields to component fields based on selected group
            const { scoreFields, componentFields } =
              groupResponseMapping[selectedGroup];

            scoreFields.forEach((field, index) => {
              if (student[field]) {
                studentData[componentFields[index]] = parseFloat(
                  student[field]
                );
              } else {
                studentData[componentFields[index]] = null;
              }
            });

            return studentData;
          });
          setTopStudents(transformedStudents);
        } else {
          setTopStudents([]);
        }
      } catch (err) {
        console.error("Failed to load top students: ", err);
        setTopStudents([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedGroup]);

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const getGroupSubjects = (group) => {
    switch (group) {
      case "A":
        return { subjects: ["Math", "Physics", "Chemistry"] };
      case "B":
        return { subjects: ["Math", "Chemistry", "Biology"] };
      case "C":
        return { subjects: ["Literature", "History", "Geography"] };
      case "D":
        return { subjects: ["Math", "Literature", "Foreign Language"] };
      default:
        return { subjects: [] };
    }
  };

  const { subjects } = getGroupSubjects(selectedGroup);

  return (
    <div className="topStudents card shadow-sm p-3">
      <div className="row mb-4">
        <div className="col-12">
          <h2>Top Students</h2>
          <p className="text-muted">
            Ranking of top 10 students by subject group
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">Select Group</h5>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="groupSelect" className="form-label">
                  Subject Group
                </label>
                <select
                  name="groupSelect"
                  id="groupSelect"
                  className="form-select"
                  value={selectedGroup}
                  onChange={handleGroupChange}
                  disabled={loading}
                >
                  <option value="A">Group A (Math, Physics, Chemistry)</option>
                  <option value="B">Group B (Math, Chemistry, Biology)</option>
                  <option value="C">
                    Group C (Literature, History, Geography)
                  </option>
                  <option value="D">
                    Group D (Math, Literature, Foreign Language)
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Top 10 students - Group {selectedGroup}</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Reg. Number</th>
                        {subjects.map((subject, index) => (
                          <th
                            key={index}
                            className="text-center d-none d-sm-table-cell"
                          >
                            {subject}
                          </th>
                        ))}
                        <th className="text-center">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topStudents.length > 0 ? (
                        topStudents.map((student, index) => (
                          <tr key={student.sbd}>
                            <td>{index + 1}</td>
                            <td>{student.sbd}</td>
                            {groupResponseMapping[
                              selectedGroup
                            ].componentFields.map((field, i) => (
                              <td
                                key={i}
                                className="text-center d-none d-sm-table-cell"
                              >
                                {student[field]}
                              </td>
                            ))}
                            <td className="text-center fw-bold">
                              {student.totalScore}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={subjects.length + 3}
                            className="text-center"
                          >
                            No students found for Group {selectedGroup}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
