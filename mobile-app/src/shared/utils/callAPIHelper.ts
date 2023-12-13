import { AxiosResponse } from 'axios';
import { toast } from '@baronha/ting';

type CallAPICommmonParams = {
  payload?: object | null;
  beforeSend?: () => void;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
  onFinaly?: () => void;
};

type CallAPIParams = CallAPICommmonParams & {
  API: any;
};

type CallAPIV2Params = CallAPICommmonParams & {
  API: (payload?: any) => Promise<AxiosResponse<unknown, unknown>>;
};

async function callAPI(prs: CallAPIParams) {
  const { API, payload, beforeSend, onSuccess, onError, onFinaly } = prs;

  try {
    !!beforeSend && beforeSend();

    const response = await API(payload);

    if (onSuccess) onSuccess(response);
  } catch (err) {
    !!onError && onError(err);
  } finally {
    !!onFinaly && onFinaly();
  }
}

async function callAPIV2(prs: CallAPIV2Params) {
  const { API, payload, beforeSend, onSuccess, onError, onFinaly } = prs;

  beforeSend && beforeSend();
  API(payload)
    .then(response => onSuccess && onSuccess(response.data))
    .catch(error => {
      onError && onError(error);
      if (error.response) {
        if (error.response.data.error) {
          toast({ title: error.response.data.error, preset: 'error' });
        }
      }
    })
    .finally(() => onFinaly && onFinaly());
}

export { type CallAPIParams, type CallAPIV2Params, callAPI, callAPIV2 };
