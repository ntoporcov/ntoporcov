import axios from "axios";

export const getPostStats = (slug) => {
  return axios.get("/api/blog/" + slug);
};

export const getAllStats = () => {
  return axios.get("/api/blog");
};

export const increaseStat = ({ slug, stat }) => {
  return axios.post("/api/blog/increaseStat", {
    slug,
    stat,
  });
};

export const sendGif = (gif, name, message) => {
  return axios.post("/api/gif/send", { gif, name, message });
};
