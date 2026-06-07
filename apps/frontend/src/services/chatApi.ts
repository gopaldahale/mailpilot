import { api } from "./api";

export async function sendMessage(
  prompt: string,
  userId: string,
) {
  const response = await api.post(
    "/chat",
    {
      prompt,
      userId,
    },
  );

  return response.data;
}