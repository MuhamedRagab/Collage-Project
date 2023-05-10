const container = document.querySelector(".my-container");
const username = document.querySelector(".username");
const logout = document.querySelector(".logout");
const count = document.getElementById("count");
const total = document.getElementById("total");

let user = JSON.parse(localStorage.getItem("user"));
const { clothes } = user;

window.addEventListener("load", () => {
  username.innerHTML = user ? user.fullName : "Guest";
  renderData();
});

function calcTotal() {
  const totalAll = clothes.reduce((acc, item) => acc + item.price, 0);
  total.innerHTML = totalAll;
}

const renderData = () => {
  count.innerHTML = clothes.length;
  calcTotal();
  const uniqueClothes = clothes.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  container.innerHTML = "";
  uniqueClothes.forEach((item, i) => {
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
              <h3 class="my-card__price">Count: <input type='number' value='${getCount(
                i
              )}' /></h3>
              <button class="my-card__button" onclick="removeCart('${i}')">Remove</button>
            </div>
          </div>
        </div>
      `;
  });
};

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
  window.location.href = "login.html";
});

function getCount(index) {
  const count = clothes.filter((item) => item.id === clothes[index].id).length;
  return count;
}
