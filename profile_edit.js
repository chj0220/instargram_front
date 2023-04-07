const token = localStorage.getItem("accessToken");
const granttype = localStorage.getItem("grantType");
const uploadbtn = document.querySelector("#upload");
var fileInput = document.getElementById("imgprofileForm");
const local_userid = localStorage.getItem("userId");

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
      $(`.image_size  > img`).attr({ src: data.profileImage });
    },
    error:function(request,status,error){   //데이터 주고받기가 실패했을 경우 실행할 결과
      alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    }
  });
});

function upload() {
  var formData = new FormData();
  var form = fileInput[0].files[0];

  formData.append('image', form);

  $.ajax({
	  type:"post",
	  enctype:'multipart/form-data',
    url:'http://52.78.86.193:8080/edit/profile-image',
    data:formData,
    enctype: "multipart/form-data",
    processData:false,
    contentType:false,
    cache:false,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", granttype + token);
    },
    success:function(data){
    	console.log("success : ", data);
      $(`.image_size  > img`).attr({ src: data });
    },
    error:function(e){
        console.log("error : ", e);
    }
  });
};

uploadbtn.addEventListener("click", upload);
