import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import scoreService from "../services/scoreService";

// Cache to store fetched data
const dataCache = {
  stats: null,
  studentCount: null,
};

export default function DashBoard() {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (dataCache.stats && dataCache.studentCount !== null) {
          setStats(dataCache.stats);
          setStudentCount(dataCache.studentCount);
          setIsLoading(false);
          return;
        }

        const allStudents = await scoreService.getDashboardScore();
        setStudentCount(allStudents.studentCount);
        let data = allStudents.data;

        const transformedStats = Object.keys(data).map((subject) => ({
          subject: subject,
          excellent: data[subject].excellent,
          good: data[subject].good,
          average: data[subject].average,
          below_average: data[subject].below_average,
        }));

        // Cache the data
        dataCache.stats = transformedStats;
        dataCache.studentCount = allStudents.studentCount;

        setStats(transformedStats);
      } catch (error) {
        console.error("Failed to load data:", error);
        setStats([]);
        setStudentCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const aggregateData = stats.map((subject) => ({
    subject: subject.subject,
    "Excellent (≥8)": subject.excellent,
    "Good (6-8)": subject.good,
    "Average (4-6)": subject.average,
    "Below Average (<4)": subject.below_average,
  }));

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "20rem" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard card shadow-sm p-3">
      <div className="row mb-3">
        <div className="col-12">
          <h2>Score Spectrum</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card h-100 text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Students</h5>
              <p className="card-text display-6">{studentCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100 text-white bg-success ">
            <div className="card-body">
              <h5 className="card-title">Quick Search</h5>
              <Link to="/search" className="btn btn-light">
                Search Student Scores
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100 text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">Top Performers</h5>
              <Link to="/topstudent" className="btn btn-light">
                View Top Students
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">Score Distribution Overview</h5>
            </div>
            <div className="card-body">
              <div style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={aggregateData}
                    margin={{ top: 20, right: 10, left: -10, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey={"subject"}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend wrapperStyle={{ marginBottom: -30 }} />
                    <Bar
                      dataKey={"Excellent (≥8)"}
                      stackId={"a"}
                      fill="#28a745"
                    />
                    <Bar dataKey="Good (6-8)" stackId="a" fill="#17a2b8" />
                    <Bar dataKey="Average (4-6)" stackId="a" fill="#ffc107" />
                    <Bar
                      dataKey="Below Average (<4)"
                      stackId="a"
                      fill="#dc3545"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="alert alert-info">
            <i className="fas fa-info-circle me-2"></i>
            Use the navigation menu to explore detailed reports and search for
            individual student scores.
          </div>
        </div>
      </div>
    </div>
  );
}
