export interface IAuthPayload {
  id: string;
  email?: string;
  role: string;
}

export enum AuthRole {
  TIKKA = "TIKKA",
  FRONT_DESK = "FRONT_DESK",
}
