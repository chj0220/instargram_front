const signupbtn = document.querySelector("#signup_btn");

const user_email = document.querySelector("#new_email");
const user_name = document.querySelector("#new_user_name");
const user_id = document.querySelector("#new_id");
const user_password = document.querySelector("#new_password");
const user_confirmPassword = document.querySelector("#new_confirmPassword");

console.log(signupbtn); //요소를 잘 가져온것인지 확인하귀 위함

function SignupHandleBtn() {
  /*const user_info = {
    userId: user_id.value,
    name: user_name.value,
    email: user_email.value,
    password: user_password.value,
    confirmPassword: user_confirmPassword.value,
  };
  console.log(typeof user_info);
  console.log(user_info);*/

  fetch("http://52.78.86.193:8080/accounts/emailsignup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      userId: user_id.value,
      name: user_name.value,
      email: user_email.value,
      password: user_password.value,
      confirmPassword: user_confirmPassword.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));

  /*$.ajax({
    method: "POST",
    url: "http://52.78.86.193:8080/accounts/emailsignup",
    data: {
      userId: user_id.value,
      name: user_name.value,
      email: user_email.value,
      password: user_password.value,
      confirmPassword: user_confirmPassword.value,
    },
    dataType: "json"  
  }).done(function (msg) {
    alert("Data Saved: " + msg);
  });*/
}

signupbtn.addEventListener("click", SignupHandleBtn);
