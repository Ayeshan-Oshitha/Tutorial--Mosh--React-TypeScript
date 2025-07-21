import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "1939a1173ffe46f090aec6b31471cd3a",
  },
});
