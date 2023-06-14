let parcent_num = document.getElementById("num");
// let conditon_num = Math.floor(Math.random() * 99);
let speed = 1;

function canvas_2() {
  let canvas = document.getElementById("canvas_2");
  //parcent_num = parseInt(parcent_num.innerHTML);
  //
  // let ctx = canvas.getContext("2d");
  let max_width = 200;
  // canvas.style.width = max_width + 'px'
  setInterval(function(){
    canvas.style.width = (parcent_num / max_width) + 'px';
    parcent_num += max_width;
  }, speed);
}

function color_change(red, green, blue) {
  return "rgb(" + red + "," + green + "," + blue + ")";
}

window.addEventListener("load", canvas_2);