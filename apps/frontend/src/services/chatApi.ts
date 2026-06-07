import { api } from "./api";

export async function sendMessage(
  prompt: string,
) {
  const response = await api.post(
    "/chat",
    {
      prompt,
    },
  );

  return response.data;
}