import { AxiosResponse } from "axios";
import { toast } from "sonner";

type CallAPIParams = {
  payload?: object | null;
  beforeSend?: () => void;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
  onFinaly?: () => void;
  API: (payload?: any) => Promise<AxiosResponse<unknown, unknown>>;
};

async function callAPI(prs: CallAPIParams) {
  const { API, payload, beforeSend, onSuccess, onError, onFinaly } = prs;

  beforeSend && beforeSend();
  API(payload)
    .then((response) => onSuccess && onSuccess(response.data))
    .catch((error) => {
      onError && onError(error);
      if (error.response) {
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        }
      }
    })
    .finally(() => onFinaly && onFinaly());
}

export { type CallAPIParams, callAPI };
