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
  projects: Project[] | null;
  selectedPrjVideos: Video[] | null;
  fetchProjects: (brandKey: string, nextUrl?: string) => Promise<void>;
  fetchProjectsVideos: (prjKey: string,nextVideosUrl?:string) => Promise<void>;
  getVideoDetails: (prjKey: string, videoKey: string) => Promise<VideoDetails>;
  playback: (screenerKey: string) => Promise<void>;
  nextPrjUrl: string | null;
  nextVidoesUrl: string | null;
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

export interface VideoItem {
  key: any;
  name: string;
  poster: string;
  screening_details: ScreeningDetails;
}

export interface VideoDetails {
  key: string
  name: string
  poster: string
  duration_in_sec: number
  cast_and_crew: any[]
  description: string
  subtitles: any[]
  is_cmaf_enabled: boolean
  season: any
  episode: any
  original_air_date: any
  screening_details: ScreeningDetails
  auth_details: AuthDetails
  overlay_watermark_details: OverlayDetails
  resume_playback: ResumeDetails
}

export interface ApiResponse<T> {
  screening_details: any;
  status: string;
  message?: string;
  data: T;
}

export interface AuthDetails {
  mode: string
  ident: {
    country_code: number
    phone: number
  }
}

export interface OverlayDetails {
  text: string
  opacity: number
  position: string
  interval_in_seconds: number
  image_link: string
}

export interface ResumeDetails {
  from_second?: number
}