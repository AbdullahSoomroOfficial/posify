import { ResponseBody } from "@interfaces";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function makeRequest(
  method: string,
  path: string,
  body?: object
): Promise<{
  success: boolean;
  data: object | null;
  successMessage: string | null;
  errorMessage: string | null;
}> {
  try {
    const API_URL: string = import.meta.env.VITE_API_PATH_PREFIX;
    const url = API_URL + path;
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const responseBody = (await response.json()) as ResponseBody;
    return {
      success: responseBody.success,
      data: responseBody.data,
      successMessage: responseBody.successMessage,
      errorMessage: responseBody.errorMessage,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      successMessage: null,
      errorMessage: (error as Error).message,
    };
  }
}
