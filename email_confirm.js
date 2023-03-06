const next_btn = document.querySelector("#next_btn");
const email_code = document.querySelector("#email"); 
const test = document.querySelector("#test");
console.log(test); //요소를 잘 가져온것인지 확인하귀 위함
console.log("이메일 인증");

function nextHandleBtn() {
  console.log("이메일인증");
  
  const user_info = JSON.parse(localStorage.getItem("ujson"));
  console.log(user_info);

  const code = localStorage.getItem("ecode");
  console.log(code);
  console.log(email_code.value);
  if (code === email_code.value) {
    $.ajax({
      method: "post",
      url: "http://52.78.86.193:8080/accounts/save",
      data: JSON.stringify(user_info),
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: function (data) {
        console.log(data);
        localStorage.clear();
      },
    }).done(function (msg) {
      alert("회원가입이 완료되었습니다.");
      location.href="login.html";
    });
  } else {
    alert("인증코드가 잘못되었습니다.");
    localStorage.clear();
  }
}

next_btn.addEventListener("click", nextHandleBtn);
