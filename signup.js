const signupbtn = document.querySelector("#signup_btn");

const user_email = document.querySelector("#new_email");
const user_name = document.querySelector("#new_user_name");
const user_id = document.querySelector("#new_id");
const user_password = document.querySelector("#new_password");
const user_form = document.querySelector("#user_form");

console.log(signupbtn); //요소를 잘 가져온것인지 확인하귀 위함

async function Deliver(key, item){
  localStorage.setItem(key, item);
}

function SignupHandleBtn() {
  console.log("회원가입");
  const user_info = {
    userId: user_id.value,
    name: user_name.value,
    email: user_email.value,
    password: user_password.value,
  };
  console.log(user_info);
  console.log(JSON.stringify(user_info));
  Deliver("ujson",JSON.stringify(user_info));

  $.ajax({
    method: "POST",
    url: "http://52.78.86.193:8080/accounts/check",
    data: JSON.stringify(user_info),
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    success: function (response) {
      Deliver("ecode",response);
      console.log(response);
      location.href="email_confirm.html";
    },
  });
}

signupbtn.addEventListener("click", SignupHandleBtn);
