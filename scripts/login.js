//** Declare variables
const wrapper = document.querySelector(".wrapper"),
  signupHeader = document.querySelector(".signup header"),
  loginHeader = document.querySelector(".login header"),
  signupForm = document.querySelector(".signup form"),
  loginForm = document.querySelector(".login form");

// get users from local storage
const users = JSON.parse(localStorage.getItem("users")) || [];

//** Event Listeners
// switch login and signup forms animation
loginHeader.addEventListener("click", () => {
  wrapper.classList.add("active");
});
signupHeader.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

// Signup form submit
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get username and password
  let [{ value: fullName }, { value: username }, { value: password }] =
    signupForm;

  // Check if username already exists
  const userExists = users.find((user) => user.username === username);

  if (userExists) {
    toastr.error("Username already exists");
    return;
  }
  // add user to local storage
  const user = { fullName, username, password, clothes: [] };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("user", JSON.stringify(user));

  // redirect to login page
  window.location.href = "views";
});

// Login form submit
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get username and password from login form
  let [{ value: username }, { value: password }] = loginForm;

  // check if username and password are correct
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    toastr.error("Username or password is incorrect");
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));
  // redirect to home page
  window.location.href = "views";
});
