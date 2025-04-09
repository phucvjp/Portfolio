import axios from "axios";

// Base URL
const API_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to headers if available
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      config.headers["x-auth-token"] = userData.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User API
export const getUserProfile = async () => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userData: any) => {
  try {
    const response = await api.put("/users/profile", userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Projects API
export const getProjects = async () => {
  try {
    const response = await api.get("/projects");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getProjectById = async (id: string) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    throw error;
  }
};

export const createProject = async (projectData: any) => {
  try {
    const response = await api.post("/projects", projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const updateProject = async (id: string, projectData: any) => {
  try {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error(`Error updating project ${id}:`, error);
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error);
    throw error;
  }
};

// Skills API
export const getSkills = async () => {
  const response = await api.get("/skills");
  return response.data;
};

export const createSkill = async (data: any) => {
  const response = await api.post("/skills", data);
  return response.data;
};

export const updateSkill = async (id: string, data: any) => {
  const response = await api.put(`/skills/${id}`, data);
  return response.data;
};

export const deleteSkill = async (id: string) => {
  const response = await api.delete(`/skills/${id}`);
  return response.data;
};

// Experiences API
export const getExperiences = async () => {
  const response = await api.get("/experiences");
  return response.data;
};

export const createExperience = async (data: any) => {
  const response = await api.post("/experiences", data);
  return response.data;
};

export const updateExperience = async (id: string, data: any) => {
  const response = await api.put(`/experiences/${id}`, data);
  return response.data;
};

export const deleteExperience = async (id: string) => {
  const response = await api.delete(`/experiences/${id}`);
  return response.data;
};

// Education API
export const getEducations = async () => {
  const response = await api.get("/educations");
  return response.data;
};

export const createEducation = async (data: any) => {
  const response = await api.post("/educations", data);
  return response.data;
};

export const updateEducation = async (id: string, data: any) => {
  const response = await api.put(`/educations/${id}`, data);
  return response.data;
};

export const deleteEducation = async (id: string) => {
  const response = await api.delete(`/educations/${id}`);
  return response.data;
};

// Contact API
export const sendContactMessage = async (messageData: any) => {
  try {
    const response = await api.post("/contact", messageData);
    return response.data;
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw error;
  }
};

export const getContactMessages = async () => {
  try {
    const response = await api.get("/contact");
    return response.data;
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    throw error;
  }
};

export const markContactMessageAsRead = async (id: string) => {
  try {
    const response = await api.put(`/contact/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error marking contact message ${id} as read:`, error);
    throw error;
  }
};

export const deleteContactMessage = async (id: string) => {
  try {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting contact message ${id}:`, error);
    throw error;
  }
};

// Upload API
export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Base64 Upload helper
export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default api;
