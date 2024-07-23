const axios = require("axios");

const postService = async () => {
  const postResponse = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
  );

  return postResponse.data;
};

module.exports = {
  postService,
};
