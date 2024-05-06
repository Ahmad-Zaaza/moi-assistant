import { AxiosInstance } from "axios";
import { EntityService } from "./entityService";

export class ApiService {
  public axiosInstance: AxiosInstance;
  public entities: EntityService;

  constructor({ axiosInstance }: { axiosInstance: AxiosInstance }) {
    this.axiosInstance = axiosInstance;
    this.entities = new EntityService({ axiosInstance });
  }
}
