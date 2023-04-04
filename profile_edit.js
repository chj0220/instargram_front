const token = localStorage.getItem("accessToken");
const granttype = localStorage.getItem("grantType");
const uploadbtn = document.querySelector("#upload");

function upload() {
  var form = $('#imgprofileForm')[0];
var formData = new FormData(form);
$.ajax({
	type:"post",
	enctype:'multipart/form-data',
    url:'http://52.78.86.193:8080/edit/profile-image',
    data:formData,
    processData:false,
    contentType:false,
    cache:false,
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Content-type","application/json");
      xhr.setRequestHeader("Authorization", granttype + token);
    },
    success:function(data){
    	console.log("success : ", data);
    },
    error:function(e){
        console.log("error : ", e);
    }
});



  /*const imageInput = $("#imgprofileForm")[0];
  // 파일을 여러개 선택할 수 있으므로 files 라는 객체에 담긴다.
  console.log("imageInput: ", imageInput.files);

  if(imageInput.files.length === 0){
    alert("파일은 선택해주세요");
    return;
  };
  
  var formData = new FormData();
  formData.append("image", imageInput.files[0]);

  $.ajax({
    method:"POST",
    url: "http://52.78.86.193:8080/edit/profile-image",
    processData: false,
    contentType: false,
    data: formData,
    success: function(rtn){
      const message = rtn.data.values[0];
      console.log("message: ", message)
      $("#resultUploadPath").text(message.uploadFilePath)
    },
    error: function(err){
      console.log("err:", err)
    }
  });*/
};

uploadbtn.addEventListener("click", upload);
