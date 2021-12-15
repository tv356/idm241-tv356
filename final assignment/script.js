  var audioUrl = 'https://freewavesamples.com/files/Alesis-S4-Plus-SterMarimb-C4.wav';
document.querySelector(".btn").click(() => new Audio(audioUrl).play());

document
  .getElementById("open-popup-btn")
  .addEventListener("click", function () {
    document.getElementsByClassName("popup")[0].classList.add("active");
  });

document
  .getElementById("dismiss-popup-btn")
  .addEventListener("click", function () {
    document.getElementsByClassName("popup")[0].classList.remove("active");
  });
  



