import api from "./axios";

export const getFaqApi = () => {
  return api.get("/faqs");
};
