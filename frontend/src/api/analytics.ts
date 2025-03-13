import { makeRequest } from "@/lib/utils";

export const analytics = {
  getAnalytics: async () => {
    return await makeRequest("GET", "/analytics");
  },
};
