const token = localStorage.getItem("accessToken");
const local_userid = localStorage.getItem("userId");
const granttype = localStorage.getItem("grantType");
const user_nick_name = document.querySelector(".user_nick_name");
const user_name = document.querySelector(".user_name");
const middle_introduction = document.querySelector(".middle_introduction");
const post_count = document.querySelector(".post_count");
const follower_count = document.querySelector(".follower_count");
const following_count = document.querySelector(".following_count");

$(function () {
  $.ajax({
    method: "GET",
    url: "http://52.78.86.193:8080/accounts/" + local_userid,
    dataType: "json",
    data: JSON.stringify(local_userid),
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Authorization", granttype + token);
    },
    success: function (data) {
      console.log("통신성공");
      console.log(data);
      user_nick_name.innerHTML = data.name;
      user_name.innerHTML = data.userId;
      middle_introduction.innerHTML = data.introduction;
      //post_count.innerHTML = data.
      follower_count.innerHTML = data.followerCount;
      following_count.innerHTML = data.followingCount;

      $.ajax({
    method: "GET",
    url: "http://52.78.86.193:8080/accounts/" + local_userid,
    dataType: "json",
    data: JSON.stringify(local_userid),
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Authorization", granttype + token);
    },
    success: function (data) {
      console.log("통신성공");
      console.log(data);
      user_nick_name.innerHTML = data.name;
      user_name.innerHTML = data.userId;
      middle_introduction.innerHTML = data.introduction;
      //post_count.innerHTML = data.
      follower_count.innerHTML = data.followerCount;
      following_count.innerHTML = data.followingCount;

      $.ajax({
        method: "GET",
        url: "http://52.78.86.193:8080/accounts/" + local_userid,
        dataType: "json",
        data: JSON.stringify(local_userid),
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Content-type", "application/json");
          xhr.setRequestHeader("Authorization", granttype + token);
        },
        success: function (data) {
          console.log("통신성공");
          console.log(data);
        },
    
        error: function (request, status, error) {
          alert(
            "code:" +
              request.status +
              "\n" +
              "message:" +
              request.responseText +
              "\n" +
              "error:" +
              error
          );
        },
      });

      // 게시물 수가 0 이면 a 태그 내용을 보여줌
      if (data.postCount === 0) {
        $(".contents_container_box").show();
        $(".mylist_contents contents_container active").hide();
      } else {
        $(".contents_container_box").hide();
        $(".mylist_contents contents_container active").show();
        $(`.profile_img > img`).attr({ src: data.profileImage });
      }
    },

    error: function (request, status, error) {
      //데이터 주고받기가 실패했을 경우 실행할 결과
      alert(
        "code:" +
          request.status +
          "\n" +
          "message:" +
          request.responseText +
          "\n" +
          "error:" +
          error
      );
    },
  });

      // 게시물 수가 0 이면 a 태그 내용을 보여줌
      if (data.postCount === 0) {
        $(".contents_container_box").show();
        $(".mylist_contents contents_container active").hide();
      } else {
        $(".contents_container_box").hide();
        $(".mylist_contents contents_container active").show();
        $(`.profile_img > img`).attr({ src: data.profileImage });
      }
    },

    error: function (request, status, error) {
      //데이터 주고받기가 실패했을 경우 실행할 결과
      alert(
        "code:" +
          request.status +
          "\n" +
          "message:" +
          request.responseText +
          "\n" +
          "error:" +
          error
      );
    },
  });
});
