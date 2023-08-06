function canvas_1() {
  let canvas = document.getElementById("canvas-1");
  let ctx = canvas.getContext("2d");
  
  const size = 50;  // 描画範囲の横幅
  let angle = 0;    // 角度
  let add = 2;      // 角度に加算する値

  setInterval(function(){
    let endAngle = angle * Math.PI / 180;
    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size, 0, endAngle, false);
    ctx.lineTo(size / 2,size / 2);
    ctx.fillStyle = color_change(120, 200, 255);
    ctx.fill();
    
    angle += add;  // 角度の加算
  },speed);
}

function color_change(red, green, blue) {
  return "rgb(" + red + "," + green + "," + blue + ")";
}

let speed = 10;
window.addEventListener("load", canvas_1);