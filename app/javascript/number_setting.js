function number_setting(){
  const NumberCounter = (target) => {
    let targetNum = parseInt(target.getAttribute('data-num'));
    const conditon_num = Math.floor(Math.random() * 99999);
    targetNum = conditon_num;
  
    if (!conditon_num) {
      return;
    }

    let data_num = null;
    let init_num = 0;
    let canvas = document.getElementById("canvas_2");
    let max_width = 200;
    let canvas_width = 0;

    const count_up = () => {
      target.innerText = `${zero_padding(init_num)}`;
      for (let i = 0; i <= count_len(targetNum); i++){
        canvas.style.width = canvas_width + 'px';
        canvas_width += max_width / canvas_num(targetNum) * Math.pow(10, count_len(targetNum) - 2);
        init_num += Math.pow(10, count_len(targetNum) - 2);
      }
      if (init_num > targetNum){
        target.innerText = targetNum;
        clearInterval(data_num);
      }
    }
    data_num = setInterval(count_up, 1);
  }
  let target = document.getElementById("num");
  NumberCounter(target);
}

function color_change(red, green, blue) {
  return "rgb(" + red + "," + green + "," + blue + ")";
}

function zero_padding(num){
  let len = parseInt(Math.log10(num)) + 1;
  if (len <= 2 || num <= 0) {
    len = 2;
  }
  return (Array(len).join('0') + num).slice(-len);
}

function count_len(max_num) {
  let len = parseInt(Math.log10(max_num));
  return len;
}

// function count_speed(count) {
//   let len = parseInt(Math.log10(count));
//   for (let i = 0; i < len; i++) {
//     count++;
//   }
//   return count;
// }

function canvas_num(max_num) {
  let len = parseInt(Math.log10(max_num)) + 1;
  return Math.pow(10, len);
}

window.addEventListener("load", number_setting);