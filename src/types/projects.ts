export interface Project {
  key: string;
  name: string;
  poster: string;
}

export interface ProjectsResponse {
  count: number;
  previous: string | null;
  next: string | null;
  results: Project[];
}

export interface ProjectsContextType {
  selectedPrjVideos: any;
  projects: Project[] | null;
  fetchProjects: (brandKey: string) => void;
  fetchProjectsVideos: (projKey: string) => void;
  playback: (projKey: string) => void;
}

export interface ProjectsProviderProps {
  children: React.ReactNode;
}

interface ScreeningDetails {
  screener_key: string;
  expired: boolean;
  max_views: number;
  views_consumed: number;
  start_date: number;
  expiry_date: number;
  offline: boolean;
}

export interface Video {
    key: string;
    name: string;
    poster: string;
    duration_in_sec: number;
    offline_download_size: number;
    cast_and_crew: any[]; 
    description: string;
    subtitles: any[]; 
    hdr_standard: string | null;
    is_cmaf_enabled: boolean;
    season: string | null;
    episode: string | null;
    original_air_date: string | null;
    screening_details: {
        screener_key: string;
        expired: boolean;
        max_views: number;
        views_consumed: number;
        start_date: number;
        expiry_date: number; 
        offline: boolean;
    };
    auth_details: any; 
    overlay_watermark_details: any; 
    resume_playback: any; 
}


export interface VideosResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Video[];
  status_code: string;
}
