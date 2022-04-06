const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

axios
  .get("https://www.omdbapi.com/?s=indiana+jones&apikey=b400a9b")
  .then((res) => {
    const data = res.data.Search;
    const presentableData = data
      .map(
        (movie) =>
          `<tr class="table">
      <td class="table-text">${movie.Title}</td>
      <td class="table-text">${movie.Year}</td>
      <td class="table-text">${movie.Type}</td>
      <td><img src="${movie.Poster}" /></td>
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

    /* GET users listing. */
    router.get("/", function (req, res, next) {
      res.render("pages/index", {
        title: "Indiana Jones info",
        table: table,
      });
    });
  });

module.exports = router;
