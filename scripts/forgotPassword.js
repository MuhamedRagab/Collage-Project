const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const [
    { value: username },
    { value: newPassword },
    { value: confirmPassword },
  ] = form;

  if (!username || !newPassword || !confirmPassword) {
    toastr.error("Please fill all the fields");
    return;
  }
  const users = JSON.parse(localStorage.getItem("users"));
  const userExists = users.find((user) => user.username === username);
  if (!userExists) {
    toastr.error("User not found");
    return;
  }
  if (newPassword !== confirmPassword) {
    toastr.error("Password not match");
    return;
  }

  userExists.password = newPassword;
  localStorage.setItem("users", JSON.stringify(users));
  toastr.success("Password changed successfully");
  setTimeout(() => (window.location.href = "/views/login.html"), 3000);
});
