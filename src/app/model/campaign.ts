export interface Campaign {
  id: number;
  name: string;
  system: string;
  description: string;
  start_date: Date;
  active: boolean;
  difficulty: number;
  characters_ids: number [];
  latitude: number;
  longitude: number;
}
