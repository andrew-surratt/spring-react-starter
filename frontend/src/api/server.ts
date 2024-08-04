import axios, { AxiosResponse } from 'axios';

export const get = async <T>(url: string, token: string): Promise<T> => {
  const response = await axios.get<T>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(
    `Response from GET ${url} (Status ${String(response.status)}): ${JSON.stringify(response.data)}`,
  );

  return response.data;
};

export const post = async <T, R>(
  url: string,
  payload: T,
  token: string,
): Promise<R> => {
  const response = await axios.post<R, AxiosResponse<R>, T>(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(
    `Response from POST ${url} (Status ${String(response.status)}): ${JSON.stringify(response.data)}`,
  );

  return response.data;
};

export const deleteCall = async <T, R>(
  url: string,
  token: string,
): Promise<R> => {
  const response = await axios.delete<R, AxiosResponse<R>, T>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(
    `Response from DELETE ${url} (Status ${String(response.status)}): ${JSON.stringify(response.data)}`,
  );

  return response.data;
};
