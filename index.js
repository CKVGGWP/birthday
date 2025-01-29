$(document).ready(function () {
  let $container = $("#container");
  let $cover = $("#cover");
  let $loader = $("#loader");

  const load = () => {
    // scroll to top
    $("body, html").scrollTop(0);

    // hide UI content
    $container.hide();
    $cover.hide();
    $loader.show();

    setTimeout(() => {
      $loader.hide();
      $container.show();
      $cover.show();
    }, 2000);
  };

  load();

  var box = $(".box"),
    orginal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    temp = orginal,
    x = [],
    sec = 0,
    date1,
    date2,
    moves = 0,
    mm = 0,
    ss = 0,
    upIMG,
    images = [
      "./images/1.jpg",
      "./images/2.jpg",
      "./images/3.jpg",
    ];
  img = 0;

  $(".me").css({ "background-image": "url(" + images[0] + ")" });

  $(".start").click(function () {
    $(".start").addClass("prevent_click");
    $(".start").delay(100).slideUp(500);
    $(".full").hide();
    $(".pre_img").addClass("prevent_click");

    date1 = new Date();
    Start();
    return 0;
  });

  function Start() {
    checkStorage();
    randomTile();
    changeBG(img);
    console.log(img);
    var count = 0,
      a,
      b,
      A,
      B;
    $(".me").click(function () {
      count++;
      if (count == 1) {
        a = $(this).attr("data-bid");
        $(".me_" + a).css({ opacity: ".65" });
      } else {
        b = $(this).attr("data-bid");
        $(".me_" + a).css({ opacity: "1" });
        if (a == b) {
        } else {
          $(".me_" + a)
            .addClass("me_" + b)
            .removeClass("me_" + a);
          $(this)
            .addClass("me_" + a)
            .removeClass("me_" + b);
          $(".me_" + a).attr("data-bid", a);
          $(".me_" + b).attr("data-bid", b);
        }
        moves++;
        swapping(a, b);
        checkCorrect(a);
        checkCorrect(b);
        a = b = count = A = B = 0;
      }
      if (arraysEqual(x)) {
        // date2 = new Date();
        // timeDifferece();
        // showScore();
        showPopup(img);
        return 0;
      }
    });
    return 0;
  }

  function randomTile() {
    var i;
    for (i = orginal.length - 1; i >= 0; i--) {
      var flag = getRandom(0, i);
      x[i] = temp[flag];
      temp[flag] = temp[i];
      temp[i] = x[i];
    }
    for (i = 0; i < orginal.length; i++) {
      box.append(
        '<div  class="me me_' + x[i] + ' tile" data-bid="' + x[i] + '"></div>'
      );
      if ((i + 1) % 6 == 0) box.append("<br>");
    }
    i = 17;
    return 0;
  }

  function arraysEqual(arr) {
    var i;
    for (i = orginal.length - 1; i >= 0; i--) {
      if (arr[i] != i) return false;
    }
    return true;
  }

  function checkCorrect(N1) {
    var pos = x.indexOf(parseInt(N1, 10));
    if (pos != N1) {
      return;
    }
    $(".me_" + N1).addClass("correct , prevent_click ");
    return;
  }

  function swapping(N1, N2) {
    var first = x.indexOf(parseInt(N1, 10)),
      second = x.indexOf(parseInt(N2, 10));
    x[first] = parseInt(N2, 10);
    x[second] = parseInt(N1, 10);
    return 0;
  }

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // function timeDifferece() {
  //   var diff = date2 - date1;
  //   var msec = diff;
  //   var hh = Math.floor(msec / 1000 / 60 / 60);
  //   msec -= hh * 1000 * 60 * 60;
  //   mm = Math.floor(msec / 1000 / 60); // Gives Minute
  //   msec -= mm * 1000 * 60;
  //   ss = Math.floor(msec / 1000); // Gives Second
  //   msec -= ss * 1000;
  //   return 0;
  // }

  function changeBG(img) {
    if (img != 3) {
      $(".me").css({
        "background-image": "url(" + images[img] + ")",
      });
      return;
    } else $(".me").css({ "background-image": "url(" + upIMG + ")" });
  }

  $(".pre_img li").hover(function () {
    img = $(this).attr("data-bid");
    changeBG(img);
  });

  // function showScore() {
  //   $("#min").html(mm);
  //   $("#sec").html(ss);
  //   $("#moves").html(moves);
  //   setTimeout(function () {
  //     $(".cover").slideDown(350);
  //   }, 1050);
  //   return 0;
  // }

  function showPopup(img){
    console.log(img);
    if (img == 0){
      localStorage.setItem("img0", "done");

      Swal.fire({
        title: "Congratulations on solving the first puzzle! :)",
        imageUrl: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb281YzhleXdzYnN1MmY5NTA3ZXBhM3hxY3M5ZjQ0ZGh6aDVnaTFnaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5mTwWeN3MoS08/giphy.gif",
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: "Custom image",
        confirmButtonText: "Yay! :)",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then((result) => {
        Swal.fire({
          title: "Do you remember this picture?",
          html: `<p>This is the time when we celebrated your 23rd birthday! :) </p>
                <p>This was on February 4, 2023. I remember the time noong iaabot ko na sa'yo 'yung bouquet na ginawa ko and I was so nervous. Haha! </p>
                <p>Oh the look on your face! You were so surprised and happy!</p>
                <p>Sinabi mo rin sa'kin na that is the first time na may nag-effort ng ganoon para sa'yo. I'm glad that I was able to make you feel special. </p>`,
          imageUrl: "./images/1.jpg",
          imageWidth: 400,
          imageHeight: 300,
          imageAlt: "Custom image",
          confirmButtonText: "Time really flies so fast! :)",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        }).then((result) => {
          location.reload();
        });
      });
    } else if (img == 1){
      localStorage.setItem("img1", "done");

      Swal.fire({
        title: "Congratulations on solving the second puzzle! :)",
        imageUrl: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb281YzhleXdzYnN1MmY5NTA3ZXBhM3hxY3M5ZjQ0ZGh6aDVnaTFnaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5mTwWeN3MoS08/giphy.gif",
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: "Custom image",
        confirmButtonText: "Yay! :)",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then((result) => {
        Swal.fire({
          title: "Going back a year ago!",
          html: `<p>This was your 24th birthday! </p>
                <p>Too bad wala tayong picture together that time. </p>
                <p>But I remember that you were so happy when I gave you the gift that I made. Your smile was priceless! </p>
                <p>You're so beautiful! Sobra kang nakaka-inlove! </p>`,
          imageUrl: "./images/2.jpg",
          imageWidth: 400,
          imageHeight: 300,
          imageAlt: "Custom image",
          confirmButtonText: "Looking beautiful as always! :)",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        }).then((result) => {
          location.reload();
        });
      });
    } else {
      localStorage.setItem("img2", "done");

      Swal.fire({
        title: "Congratulations on solving the final puzzle! :)",
        imageUrl: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb281YzhleXdzYnN1MmY5NTA3ZXBhM3hxY3M5ZjQ0ZGh6aDVnaTFnaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5mTwWeN3MoS08/giphy.gif",
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: "Custom image",
        confirmButtonText: "Yay! :)",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then((result) => {
        Swal.fire({
          title: "The most recent memory!",
          html: `<p>Our latest picture together! </p>
          <p>This was taken last January 25, 2025. </p>
          <p>Kasama rin natin dito ang ating baby Starry! </p>
          <p>I really hated the 5th picture that we took kasi sabi mo na mag-poker face tayo pero nakangiti ka! Syempre, hindi ito ang pinili kong picture. Haha! </p>
          <p>I really love this picture kasi kitang-kita ang saya natin! Mas naging masaya ang buhay natin noong dumating si baby Starry! </p>
          <p>Thank you for being the best partner and fur mom! I love you so much! </p>`,
          imageUrl: "./images/3.jpg",
          imageWidth: 400,
          imageHeight: 300,
          imageAlt: "Custom image",
          confirmButtonText: "Here's to more memories together! :)",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        }).then((result) => {
          location.reload();
        });
      });
    }
  }

  // $(".OK").click(function () {
  //   $(".cover").slideUp(350);
  // });

  function checkStorage(){
    if (localStorage.getItem("img0") == "done" && localStorage.getItem("img1") == "done" && localStorage.getItem("img2") == "done"){
      Swal.fire({
        title: "Congratulations on solving all the puzzles! :)",
        imageUrl: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWFudDV5bXp1ZzdkOWF0MWZ6bXg0MDhtcmJqczZ3bTVuaGxhdTJlNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/h2HsBrlSQq8Jfbvzbz/giphy.gif",
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: "Custom image",
        text: "I hope that you enjoyed solving the puzzles! You are amazing! :)",
        confirmButtonText: "Yay! :)",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then((result) => {
        window.location.href = "https://ckvggwp.github.io/birthday/";
      });
    }
  }

  $(".clear").click(function () {
    localStorage.clear();
  });

  $(".reset").click(function () {
    // $(".tile").remove();
    // $("br").remove();
    // $(".full").show();
    // $(".start").show();
    // $(".pre_img, .start").removeClass("prevent_click");

    // temp = orginal;
    // x = [];
    // moves = ss = mm = 0;
    // return 0;
    Swal.fire({
      title: "Congratulations on solving the first puzzle! :)",
      imageUrl: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb281YzhleXdzYnN1MmY5NTA3ZXBhM3hxY3M5ZjQ0ZGh6aDVnaTFnaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5mTwWeN3MoS08/giphy.gif",
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: "Custom image",
      confirmButtonText: "Yay! :)",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    }).then((result) => {
      Swal.fire({
        title: "Do you remember this picture?",
        html: `<p>This is the time when we celebrated your 23rd birthday! :) </p>
              <p>This was on February 4, 2023. I remember the time noong iaabot ko na sa'yo 'yung bouquet na ginawa ko and I was so nervous. Haha! </p>
              <p>Oh the look on your face! You were so surprised and happy!</p>
              <p>Sinabi mo rin sa'kin na that is the first time na may nag-effort ng ganoon para sa'yo. I'm glad that I was able to make you feel special. </p>`,
        imageUrl: "./images/1.jpg",
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: "Custom image",
        confirmButtonText: "Time really flies so fast! :)",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then((result) => {
        location.reload();
      });
    });
  });

  // $("#upfile1").click(function () {
  //   $("#file1").trigger("click");
  // });

  // $("#file1").change(function () {
  //   readURL(this);
  // });

  // function readURL(input) {
  //   if (input.files && input.files[0]) {
  //     var reader = new FileReader();

  //     reader.onload = function (e) {
  //       upIMG = e.target.result;
  //       img = 3;
  //       changeBG(3);
  //     };
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }
});
