export interface DoctorUser {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  date_of_birth: string;
}

export interface Doctor {
  id: number;
  user: DoctorUser;
}

export interface DoctorsState {
  doctors: Doctor[];
  total: number;
  offset: number;
  limit: number;
  loading: boolean;
}

export interface AllDoctorsResponse {
  doctors: Doctor[];
  total: number;
  limit: number;
  offset: number;
}
