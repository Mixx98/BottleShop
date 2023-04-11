import axios from "axios";
const api = require("../../api.json"); // API 불러오기

const check = async () => {
  const isAdmin = await axios
    .get(api.users_auth_GET)
    .then((response) => response.data.isAdmin); // 쿠키 유저이름 가져오기
  if (!isAdmin) window.location.assign("/categories");
};

export default check;
