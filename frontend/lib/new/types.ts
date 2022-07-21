export interface ClientModel {
  id?: number,
  firstname?: string,
  lastname?: string,
  birthdate?: string,
  middlename?: string,
  email?: string,
  income?: number,
  source?: string,
  address?: string,
  city?: string,
  zipcode?: number,
  district?: string,
  county?: string,
  church?: string,
  mortgage?: number,
  rent?: number,
  landlord?: string,
  ebt?: boolean,
  veteran?: boolean,
  disabled?: boolean,
  homelessType?: string,
  race?: string,
  ethnicity?: string,
  gender?: string,
  interests?: string,
  programs?: string,
  notes?: string
}

export interface HouseholdModel {
  id: number,
  address?: string,
  city?: string,
  zipcode?: number,
  district?: string,
  county?: string,
  mortgage?: number,
  rent?: number,
  landlord?: string,
  homelesstype?: string,
  individuals?: {
    data: [
      {
        id: number,
      }
    ]
  }
}
