const token = localStorage.getItem("accessToken");
const granttype = localStorage.getItem("grantType");
const pbtn = document.querySelector(".submit_btn");
const ptxt = document.querySelector("#text_field");
var fileInput = document.querySelector(".post_form");

function PostHandleBtn() {
  var formData = new FormData();
  var form = document.querySelector("#id_photo").files[0];
  formData.append("images", form);
  formData.append("content", ptxt.value);
  console.log("formData:", formData);

  $.ajax({
    type: "post",
    url: "http://52.78.86.193:8080/post/write",
    data: formData,
    processData: false,
    contentType: false,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", granttype + " " + token);
    },
    success: function (data) {
      console.log("success: ", data);
    },
    error: function (e) {
      console.log("error: ", e);
    },
  });

  console.log("Ajax request sent.");
}

pbtn.addEventListener("click", function(event) {
  event.preventDefault();
  PostHandleBtn();
});