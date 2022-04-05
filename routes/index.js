const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

axios
  .get("https://www.omdbapi.com/?s=lord+of+the+rings&apikey=b400a9b")
  .then((res) => {
    const data = res.data.Search;
    const presentableData = data
      .map(
        (movie) =>
          `<tr class="table">
      <td>${movie.Title}</td>
      <td>${movie.Year}</td>
      <td>${movie.Type}</td>
      <td><img width=200 height=auto src="${movie.Poster}" /></td>
      </tr>`
      )
      .reduce((pre, cur) => pre + cur);

    const table = `<table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Year</th>
        <th scope="col">Type</th>
        <th scope="col">Poster</th>
      </tr>
    </thead>
    <tbody>
      ${presentableData}
    </tbody>
    </table>`;

    /* GET home page. */
    router.get("/", function (req, res, next) {
      res.render("pages/index", { title: "Movie App", table: table });
    });
  });

module.exports = router;
