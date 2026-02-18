export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface ApiInfo {
  count: number;        
  pages: number;        
  next: string | null;  
  prev: string | null;
}

export interface LocationModel {
  info: ApiInfo;
  results: Location[];
}