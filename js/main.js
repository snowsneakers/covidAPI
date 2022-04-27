const url = `https://covid-19.dataflowkit.com/v1`;
console.log(url);
fetch(url)
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    console.log(data);

    //  loop through data

    data.map((x) => {
      for (let key in x) {
        //    remove + sign from number
        if (x[key].includes("+")) {
          x[key] = x[key]
            .split("")
            .filter((a) => a !== "+")
            .join("");
        }
        //    if key is empty string or n/a change that value to 0
        if (x[key] === "" || x[key] === "N/A") {
          x[key] = 0;
        }
      }
      // removed data index 229 which was displaying undefined also removes world index from table
      if (x["Country_text"] !== undefined && x["Country_text"] !== "World") {
        getInfo(x);
      } else {
        return;
      }
    });
    // calls worldinfo function
    worldInfo(data);
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

// append table data to dom
const getInfo = (data) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
                <tr>
                    <th scope="row">${data["Country_text"]}</th>
                    <td>${data["Total Cases_text"]}</td>
                    <td>${data["Active Cases_text"]}</td>
                    <td class="newCases">${data["New Cases_text"]}</td>
                    <td>${data["Total Deaths_text"]}</td>
                    <td>${data["New Deaths_text"]}</td>
                </tr>
            `;
  document.querySelector("tbody").appendChild(tr);
};

// append world stats to hero in dom
const worldInfo = (data) => {
  const worldStats = document.createElement("section");
  worldStats.classList.add("worldStats");
  worldStats.innerHTML = `
            <p>The <span>${data[0]["Country_text"]}</span> has <span>${data[0]["Total Cases_text"]}</span> total cases,  <span>${data[0]["Active Cases_text"]}</span> active cases, <span>${data[0]["New Cases_text"]}</span> new cases, <span class="heroDeaths">${data[0]["Total Deaths_text"]}</span> total deaths and, <span>${data[0]["New Deaths_text"]}</span> new deaths</p>
            <p>Check out your countries Covid stats below!</p>
            `;
  document.querySelector(".worldInfo").appendChild(worldStats);
};

// removes down arrow on header if user scrolls
window.onscroll = () => {
  let scrollArrow = document.querySelector(".scrollDown");
  if (scrollY !== 0) {
    scrollArrow.classList.add("d-none");
  } else {
    scrollArrow.classList.remove("d-none");
  }
};

//   adds smooth scroll to down arrow button
document.querySelector(".scrollDown").addEventListener("click", () => {
  document.querySelector("#stats").scrollIntoView({ behavior: "smooth" });
});
