export interface Vehicle {
  _id: string;
  brand: string;
  model: string;
  plate: string;
  user_id: string;
  parkers: Array<string>;
}
