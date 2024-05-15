import { AxiosInstance } from "axios";
import { EntityService } from "./entityService";
import { RagService } from "./ragService";

export class ApiService {
  public axiosInstance: AxiosInstance;
  public entities: EntityService;
  public rag: RagService;

  constructor({ axiosInstance }: { axiosInstance: AxiosInstance }) {
    this.axiosInstance = axiosInstance;
    this.entities = new EntityService({ axiosInstance });
    this.rag = new RagService({ axiosInstance });
  }
}
