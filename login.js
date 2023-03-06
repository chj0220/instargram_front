const loginbtn = document.querySelector("#login_btn");
const user_id = document.querySelector("#name");
const user_password = document.querySelector("#password");

console.log(loginbtn);

function LoginHandleBtn() {
  console.log("로그인");

  const user_info = {
    userIdOrEmail: user_id.value,
    password: user_password.value,
  };
  console.log(user_info);
  console.log(JSON.stringify(user_info));

  $.ajax({
    method: "POST",
    url: "http://52.78.86.193:8080/auth/signin",
    data: JSON.stringify(user_info),
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    success: function (data) {
      console.log(data);
    },
  }).done(function (msg) {
    alert("Data Saved: " + msg);
  });
}

loginbtn.addEventListener("click", LoginHandleBtn);
