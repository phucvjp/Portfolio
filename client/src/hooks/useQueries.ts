import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserProfile,
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
  sendContactMessage,
  getContactMessages,
  deleteContactMessage,
  markContactMessageAsRead,
  getHonors,
  getHonorById,
  createHonor,
  updateHonor,
  deleteHonor,
} from "../utils/api";

// Query Keys
export const QUERY_KEYS = {
  PROFILE: "profile",
  PROJECTS: "projects",
  PROJECT: "project",
  SKILLS: "skills",
  EXPERIENCES: "experiences",
  EDUCATIONS: "educations",
  MESSAGES: "messages",
  HONORS: "honors",
};

// User Profile Hooks
export const useUserProfile = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: getUserProfile,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
    },
  });
};

// Projects Hooks
export const useProjects = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROJECTS],
    queryFn: getProjects,
  });
};

export const useProjectById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROJECT, id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateProject(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROJECT, variables.id],
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] });
    },
  });
};

// Skills Hooks
export const useSkills = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.SKILLS],
    queryFn: getSkills,
  });
};

// Skills Mutations
export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SKILLS] });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateSkill(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SKILLS] });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SKILLS] });
    },
  });
};

// Experiences Hooks
export const useExperiences = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.EXPERIENCES],
    queryFn: getExperiences,
  });
};

// Experiences Mutations
export const useCreateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXPERIENCES] });
    },
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateExperience(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXPERIENCES] });
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EXPERIENCES] });
    },
  });
};

// Educations Hooks
export const useEducations = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.EDUCATIONS],
    queryFn: getEducations,
  });
};

// Education Mutations
export const useCreateEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EDUCATIONS] });
    },
  });
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateEducation(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EDUCATIONS] });
    },
  });
};

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EDUCATIONS] });
    },
  });
};

// Contact Hook
export const useSendContactMessage = () => {
  return useMutation({
    mutationFn: sendContactMessage,
  });
};

// Messages Hooks
export const useMessages = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.MESSAGES],
    queryFn: getContactMessages,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markContactMessageAsRead,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MESSAGES] });
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContactMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MESSAGES] });
    },
  });
};

// Honors Hooks
export const useHonors = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.HONORS],
    queryFn: getHonors,
  });
};

export const useHonorById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.HONORS, id],
    queryFn: () => getHonorById(id),
    enabled: !!id,
  });
};

export const useCreateHonor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHonor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.HONORS] });
    },
  });
};

export const useUpdateHonor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateHonor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.HONORS] });
    },
  });
};

export const useDeleteHonor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHonor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.HONORS] });
    },
  });
};
