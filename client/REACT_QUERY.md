# React Query Implementation Guide

## Overview

This project uses [React Query](https://tanstack.com/query/latest) to manage data fetching, caching, and state management. React Query offers several benefits over traditional state management and data fetching:

1. **Automatic caching** - React Query automatically caches API responses
2. **Background refetching** - Data is refreshed in the background while showing stale data
3. **Loading & error states** - Built-in loading and error handling
4. **Optimistic updates** - Update UI before the server responds
5. **Declarative data fetching** - Simplified API for data fetching

## Implementation Details

### Setup

The React Query provider is set up in `App.tsx`:

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// In the component
return (
  <QueryClientProvider client={queryClient}>
    {/* Rest of the app */}
  </QueryClientProvider>
);
```

### API Hooks

Custom hooks in `src/hooks/useQueries.ts` wrap API calls:

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, getProjectById /* ... */ } from "../utils/api";

// Query Keys
export const QUERY_KEYS = {
  PROFILE: "profile",
  PROJECTS: "projects",
  PROJECT: "project",
  // ...
};

// Hooks for data fetching
export const useProjects = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROJECTS],
    queryFn: getProjects,
  });
};

// Hooks for mutations
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] });
    },
  });
};
```

## Usage in Components

### Data Fetching

Replace `useState`, `useEffect`, and direct API calls:

```jsx
// Before
const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

// After
const { data: projects = [], isLoading, error } = useProjects();
```

### Mutations (Creating/Updating/Deleting Data)

```jsx
// Before
const handleSubmit = async (data) => {
  try {
    await createProject(data);
    // Manually refetch or update state
  } catch (error) {
    console.error(error);
  }
};

// After
const { mutate, isLoading } = useCreateProject();

const handleSubmit = (data) => {
  mutate(data, {
    onSuccess: () => {
      // Handle success (React Query automatically refetches queries)
    },
    onError: (error) => {
      // Handle error
    },
  });
};
```

## Benefits in This Project

1. **Reduced boilerplate** - Eliminates repetitive fetch/loading/error state management
2. **Consistent loading states** - All components show loading indicators in the same way
3. **Automatic cache updates** - When data changes in one component, all components display the updated data
4. **Improved performance** - Cached data is shown immediately while refreshing in the background

## Next Steps

To further enhance the React Query implementation:

1. Add **devtools** for debugging: `import { ReactQueryDevtools } from '@tanstack/react-query-devtools'`
2. Configure **retry logic** for failed requests
3. Implement **prefetching** for improved navigation experiences
4. Add **optimistic updates** for a more responsive UI
