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

export const getGuestsByName = (name) => {
  return axios.get("/api/luna/guests", { params: { name } });
};

export const updateGuest = (name, going, group) => {
  return axios.post("/api/luna/update", { name, going, group });
};

export const getAllGuests = () => {
  return axios.get("/api/luna/getAll");
};

export const invitePerson = (name, group, aliases) => {
  return axios.post("/api/luna/invite", {
    name,
    group,
    aliases: aliases || [],
  });
};
