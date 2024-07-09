import { Property } from "./property.model";

export interface User {
  uid: string,
  name: string,
  email: string,
  password: string,
  img: string,
  properties: Property[]
}