const myUsername = document.getElementById("Username");
const username = localStorage.getItem("userName");
myUsername.textContent = `Username: ${username}`;

let ratingLists = { ratingList1: [], ratingList2: [], ratingList3: [] };

function rateItem(item) {
  const ID = "rating" + item;
  const rating = Number(document.getElementById(ID).value);
  const key = "ratingList" + item;
  ratingLists[key].push(rating);

  const aID = "average" + item;
  const avg = document.getElementById(aID);
  const newAverage = findAverageRating(item);
  avg.textContent = "Average Rating: " + newAverage;
}

function findAverageRating(item) {
  const key = "ratingList" + item;
  const ratings = ratingLists[key];
  let sum = 0;
  for (rating of ratings) {
    sum = sum + rating;
  }
  let average = sum / ratings.length;
  return average;
}
