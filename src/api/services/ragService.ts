import { AxiosInstance } from "axios";

export class RagService {
  private axiosInstance: AxiosInstance;

  constructor({ axiosInstance }: { axiosInstance: AxiosInstance }) {
    this.axiosInstance = axiosInstance;
  }

  streamAudio = ({
    formData,
    token,
    signal,
  }: {
    formData: FormData;
    token: string;
    signal: AbortSignal | undefined;
  }) =>
    fetch(
      // `${this.axiosInstance.defaults.baseURL}/be_workflows/be_wf_graph/id/58566a8e-f2d4-4382-a575-6cbcf74edfcd/stream_response`,
      `${this.axiosInstance.defaults.baseURL}/be_workflows/be_wf_graph/id/45903d72-17d0-4028-9cf6-475f26aed2bb/stream_response`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        signal,
      },
    );

  resetBot = ({ conv_id, token }: { conv_id: string; token: string }) => {
    const formData = new FormData();
    formData.append("conv_id", conv_id);
    return fetch(
      `${this.axiosInstance.defaults.baseURL}/be_workflows/be_wf_graph/id/9824b9e1-8ee3-4638-aa30-d16acebbe9a6/call`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );
  };
}
