interface Project {
  key: string;
  name: string;
  poster: string;
}

interface ProjectsResponse {
  count: number;
  previous: string | null;
  next: string | null;
  results: Project[];
}

interface ProjectsContextType {
  projects: Project[] | null;
  fetchProjects: () => void;
}

interface ProjectsProviderProps {
  children: React.ReactNode;
}
