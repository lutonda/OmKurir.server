import { Model } from "../models";

export default interface IRepository<T> {
  find(id: string): Promise<T | null>;
  create(data: any): Promise<T | null>;
  update(data: any): Promise<T | null>;
  delete(data: any): Promise<any>;
  all(): Promise<T[] | null>;
  allBy(query: any): Promise<T[] | null>;
  first(): Promise<T | null>;
  last(): Promise<T | null>;
  disable(data: any): Promise<T | null>;
  enable(data: any): Promise<T | null>;
  clear(): Promise<boolean>;
}
