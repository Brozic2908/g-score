import api from "./api";

const scoreService = {
  getScoreByRegStudent: async (regStudent) => {
    try {
      const response = await api.get("search", {
        params: {
          registration_number: regStudent,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in fetching search data: ", error);
    }
  },
  getDashboardScore: async () => {
    try {
      const response = await api.get("dashboard");
      return response.data;
    } catch (error) {
      console.error("Error in fetching dashboard data: ", error);
    }
  },
  getTopStudent: async () => {
    try {
      const response = await api.get("topstudent");
      return response.data;
    } catch (error) {
      console.error("Error in fetching top student data: ", error);
    }
  },
};

export default scoreService;
