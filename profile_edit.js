const Token = localStorage.getItem("accessToken");
const granttype = localStorage.getItem("grantType");

$(function(){

    $.ajax({
      method: "GET",
      url: "http://52.78.86.193:8080/edit/confirm-email",
      dataType: "json",
      data: JSON.stringify(Token),
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Content-type","application/json");
        xhr.setRequestHeader("Authorization", granttype + Token);
      },
      success: function(data) {
        console.log("통신성공");
        console.log(data);
      },
      error:function(request,status,error){   //데이터 주고받기가 실패했을 경우 실행할 결과
        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
      }
    });
  });