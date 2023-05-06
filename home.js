const token = localStorage.getItem("accessToken");
const local_userid = localStorage.getItem("userId");
const granttype = localStorage.getItem("grantType");
const user_nick_name = document.querySelector(".user_nick_name");
const user_name = document.querySelector(".user_name");

$(function(){
    $.ajax({
      method: "GET",
      url: "http://52.78.86.193:8080/post/home",
      dataType: "json",
      data: JSON.stringify(local_userid),
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Content-type","application/json");
        xhr.setRequestHeader("Authorization", granttype + token);
      },
      success: function(data) {
        showPosts(data);
        // swiper 마지막에 해줘야 작동(아님 작동 안함)
        var swiper = new Swiper('.swiper',{
            initialSlide:0,
            slidesPerView:1,
            observer:true,
            observeParaents:true,
            pagination:{
                el:'.swiper-pagination',
                type:'bullets',
            },
            navigation:{
                nextEl:'.swiper-button-next',
                prevEl:'.swiper-button-prev'
            },
            autoHeight:true
        });
      },
      error:function(request,status,error){   //데이터 주고받기가 실패했을 경우 실행할 결과
        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
      }
    });
});

  // 화면에 표시
function showPosts(data){
    console.log(data);
    var postContainer = document.getElementById("post_container");

    // 리스트 아이템 생성
    data.forEach(data=>postContainer.insertAdjacentHTML("beforeend", post(data)));
}

function post(data){
    var html='';
    html += `<div class="contents_box">
                <article class="contents">
                <header class="top">
                    <div class="user_container">
                    <div class="profile_img">
                        <img src="${data.authorProfileImage}" alt="프로필이미지" onerror="this.src='../imgs/default_profile.png'"/>
                    </div>
                    <div class="user_name">
                        <div class="nick_name m_text">${data.authorId}</div>
                    </div>
                    </div>
                    <div class="sprite_more_icon" data-name="more">
                        <ul class="toggle_box">
                            <li>
                            <input
                                type="submit"
                                class="follow"
                                value="팔로우"
                                data-name="follow"
                            />
                            </li>
                            <li>수정</li>
                            <li>삭제</li>
                        </ul>
                    </div>
                </header>`;
    html+= imageHtml(data.postImages);
    html+=`     <div class="bottom_icons">
                    <div class="left_icons">
                    <div class="heart_btn" id="${data.postId}">
                        ${fillHeart(data.postId, data.iliked)}
                    </div>
                    <div class="sprite_bubble_icon"></div>
                    </div>
                </div>

                <div class="likes m_text">
                    좋아요
                    <span id="like-count-${data.postId}">${data.likes}</span>
                    <span id="bookmark-count-39"></span>
                    개
                </div>

                <div class="comment_container">
                    <div class="comment-detail c_text">
                        <div>댓글 ${data.commentCount}개 모두 보기</div>
                    </div>
                </div>

                <div class="timer">${elpasedTime(data.createdAt)}</div>

                <div class="comment_field" id="add-comment-post37">
                    <input type="text" placeholder="댓글달기..." />
                    <div class="upload_btn m_text" data-name="comment">게시</div>
                </div>
                </article>
            </div>`;

    return html;
}

function imageHtml(images){
    // 이미지가 한개일 때
    if(images.length==1){
        return `<div class="img_section">
            <div class="trans_inner">
            <div>
                <img src="${images[0]}" alt="visual01" />
            </div>
            </div>
        </div>`;
    }
    // 이미지가 한개 이상일 떄
    return `<div class="img_section">
    <div class="swiper">
      <div class="swiper-wrapper">
        ${getImages(images)}
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>`;
}

function getImages(images){
    var string='';
    images.forEach(image=>string+=`<div class="swiper-slide"><img src="${image}"></div>`);
    return string;
}

function elpasedTime(string){
    const date = getDate(string);
    const now = new Date(new Date().getTime()+3240 * 10000);

    const betweenTime = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
}

function getDate(string){
    return new Date(string.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$1-$2-$3 $4:$5:$6'));
}

function toggleLike(postId){
    var fLike=document.getElementById('flike'+postId);
    var like = document.getElementById('like'+postId);
    var count = document.getElementById('like-count-'+postId);

    if(fLike.style.display=="none"){
        like.style.display="none";
        fLike.style.display="block";
        count.innerText=parseInt(count.textContent)-1;
    }else{
        like.style.display="block";
        fLike.style.display="none";
        count.innerText=parseInt(count.textContent)+1;
    }
    $.ajax({
        method: "POST",
        url: "http://52.78.86.193:8080/post/"+postId+"/like",
        dataType: "text",
        data: JSON.stringify(local_userid),
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Content-type","application/json");
          xhr.setRequestHeader("Authorization", granttype + token);
        },
        success: function(data) {
        },
        error:function(request,status,error){   //데이터 주고받기가 실패했을 경우 실행할 결과
          alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
      });
}

function fillHeart(postId, boolean){
    if(boolean){
        return `<div
        class="sprite_heart_icon_outline"
        id="flike${postId}"
        data-name="heartbeat"
        onclick="toggleLike(${postId})" 
        style="display:none"
        ></div>
        <div
        class="sprite_heart_icon_outline_on"
        id="like${postId}"
        data-name="heartbeat"
        onclick="toggleLike(${postId})"
        ></div>`;
    }
    else{
        return `<div
        class="sprite_heart_icon_outline"
        id="flike${postId}"
        data-name="heartbeat"
        onclick="toggleLike(${postId})" 
        ></div>
        <div
        class="sprite_heart_icon_outline_on"
        id="like${postId}"
        data-name="heartbeat"
        style="display:none"
        onclick="toggleLike(${postId})"
        ></div>`;
    }
}