const loginbtn = document.querySelector("#login_btn");
const user_name = document.querySelector("#name");
const user_password = document.querySelector("#password");

console.log(loginbtn);

function loginToken_setstorage (key, item){
  console.log("로그인 토큰 저장 함수");
  localStorage.setItem(key, item);
}

function LoginHandleBtn() {
  console.log("로그인");

  const user_info = {
    userIdOrEmail: user_name.value,
    password: user_password.value,
  };
  console.log(user_info);
  console.log(JSON.stringify(user_info));
  loginToken_setstorage('userIdOrEmail',user_name.value);

  $.ajax({
    method: "POST",
    url: "http://52.78.86.193:8080/auth/signin",
    data: JSON.stringify(user_info),
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    success: function (data) {
      console.log(data);
      loginToken_setstorage('accessToken',data.accessToken);
      loginToken_setstorage('accessTokenExpiresIn', data.accessTokenExpiresIn);
      loginToken_setstorage('grantType',data.grantType);
      loginToken_setstorage('refreshToken',data.refreshToken);
      loginToken_setstorage('refreshTokenExpiresIn',data.refreshTokenExpiresIn);
      loginToken_setstorage('userId',data.id);
    },
    complete:function(){
      location.replace('profile.html');
    },
    error:function(request, status, error) {
      alert("아이디와 비밀번호를 다시 확인해주세요.");
     }
  });
}

loginbtn.addEventListener("click", LoginHandleBtn);
