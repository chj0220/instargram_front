const token = localStorage.getItem("accessToken");
const local_userid = localStorage.getItem("userId");
const granttype = localStorage.getItem("grantType");
const member_id = localStorage.getItem("accessToken");
const user_nick_name = document.querySelector(".user_nick_name");
const user_name = document.querySelector(".user_name");

$(function(){

  $.ajax({
    method: "GET",
    url: "http://52.78.86.193:8080/accounts/"+local_userid,
    dataType: "json",
    data: JSON.stringify(local_userid),
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Content-type","application/json");
      xhr.setRequestHeader("Authorization", granttype + token);
    },
    success: function(data) {
      console.log("통신성공");
      console.log(data);
      user_nick_name.innerHTML = data.name;
      user_name.innerHTML = data.userId;
    },
    error:function(request,status,error){   //데이터 주고받기가 실패했을 경우 실행할 결과
      alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    }
  });
});


