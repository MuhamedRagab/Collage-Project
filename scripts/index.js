const container = document.querySelector(".container");
const username = document.querySelector(".username");
const logout = document.querySelector(".logout");
let clothes = [];

window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) location.href = "views/login.html";

  fetch("../clothes.json")
    .then((res) => res.json())
    .then((data) => (clothes = data))
    .finally(() => renderData());
});

const renderData = () => {
  clothes.forEach((item, i) => {
    container.innerHTML += `
        <div class="card">
          <h2 class="card__title">${item.title}</h2>
          <img class="card__image" src='${item.image}' alt=${item.title}</ />
          <h3 class="card__price">$${item.price}</h3>
          <div>
            <button class="card__button" onclick="addCart('${i}')">Add to cart</button>
          </div>
        </div>
      `;
  });
};

function addCart(index) {
  const user = JSON.parse(localStorage.getItem("user"));
  const users = JSON.parse(localStorage.getItem("users"));

  const clotheExist = user.clothes.find(
    (item) => item.id === clothes[index].id
  );

  if (clotheExist) {
    clotheExist.count++;
  } else {
    clothes[index].count = 1;
    user.clothes.push(clothes[index]);
  }

  const indexUser = users.findIndex((item) => item.username === user.username);
  users[indexUser] = user;

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("users", JSON.stringify(users));

  alert("Added to cart");
}

logout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "views/login.html";
});
