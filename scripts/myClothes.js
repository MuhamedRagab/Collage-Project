const container = document.querySelector(".my-container");
const username = document.querySelector(".username");
const logout = document.querySelector(".logout");
const count = document.getElementById("count");
const total = document.getElementById("total");

let user = JSON.parse(localStorage.getItem("user"));
let clothes = [];

window.addEventListener("load", () => {
  if (!user) location.href = "/views/login.html";

  clothes = user.clothes;
  username.innerHTML = user.fullName || user.username;
  renderData();
});

function calcTotal() {
  const totalAll = clothes.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );
  total.innerHTML = totalAll.toFixed(2);
}

function calcCount() {
  const countAll = clothes.reduce((acc, item) => acc + +item.count, 0);
  count.innerHTML = countAll;
}

const renderData = () => {
  calcCount();
  calcTotal();

  container.innerHTML = "";
  clothes.forEach((item, i) => {
    container.innerHTML += `
        <div class="my-card">
          <div class="my-card__content">
            <img 
            class="my-card__image" 
            src='${item.image}' 
            alt='${item.title}'/>
            <div>
              <h2 class="my-card__title">${item.title}</h2>
              <h3 class="my-card__price">Price: $${item.price}</h3>
              <h3 class="my-card__price">
                Count: <input type='number' class="input__count-${item.id}" value='${item.count}' onchange="changeProductCount('${i}', '${item.id}')"
                min='1'
                max='10'
                />
              </h3>
              <button class="my-card__button" onclick="removeCart('${i}')">Remove</button>
            </div>
          </div>
        </div>
      `;
  });
};

function changeProductCount(index, id) {
  const user = JSON.parse(localStorage.getItem("user"));
  const users = JSON.parse(localStorage.getItem("users"));

  const indexUser = users.findIndex((item) => item.username === user.username);
  const count = document.querySelector(`.input__count-${id}`).value;
  const indexClothes = clothes.findIndex(
    (item) => item.id === clothes[index].id
  );

  clothes[indexClothes].count = count;
  users[indexUser].clothes = clothes;

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("user", JSON.stringify(users[indexUser]));

  renderData();
}

function removeCart(index) {
  const user = JSON.parse(localStorage.getItem("user"));
  const users = JSON.parse(localStorage.getItem("users"));

  const indexUser = users.findIndex((item) => item.username === user.username);
  clothes.splice(index, 1);
  users[indexUser].clothes = clothes;

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("user", JSON.stringify(users[indexUser]));

  renderData();
}

logout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/views/login.html";
});

function getCount(index) {
  const count = clothes.filter((item) => item.id === clothes[index].id).length;
  return count;
}
