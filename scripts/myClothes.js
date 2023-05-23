const container = document.querySelector(".my-container");
const username = document.querySelector(".username");
const logout = document.querySelector(".logout");
const count = document.getElementById("count");
const total = document.getElementById("total");

const users = JSON.parse(localStorage.getItem("users"));
let user = JSON.parse(localStorage.getItem("user"));
const currUser = users.find((item) => item.username === user.username);
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
                />
              </h3>
              <button class="my-card__button" onclick="removeCart('${i}')">Remove</button>
            </div>
          </div>
        </div>
      `;
  });
};

function saveData() {
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("user", JSON.stringify(currUser));
  renderData();
}

function changeProductCount(index, id) {
  const count = document.querySelector(`.input__count-${id}`).value;

  clothes[index].count = count;
  currUser.clothes = clothes;

  saveData();
}

function pay() {
  if (!currUser.clothes.length) return alert("Your cart is empty!");

  let isWantPay = confirm("Are you sure you want to pay?");
  if (!isWantPay) return;

  currUser.clothes = clothes = [];

  alert("Thank you for your purchase");
  saveData();
}

function removeCart(index) {
  clothes.splice(index, 1);
  currUser.clothes = clothes;

  saveData();
}

logout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/views/login.html";
});
