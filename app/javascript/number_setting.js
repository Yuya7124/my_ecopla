function number_setting(){
  const NumberCounter = (target) => {
    let targetNum = parseInt(target.getAttribute('data-num'));
    const conditon_num = Math.floor(Math.random() * 999);
    targetNum = conditon_num;
  
    if (!conditon_num) {
      return;
    }

    let data_num = null;
    let init_num = 0;

    const count_up = () => {
      target.innerText = `${zero_padding(init_num, targetNum)}`;
      init_num++;
      if (init_num > targetNum){
        target.innerText = targetNum;
        clearInterval(data_num);
      }
    }
    data_num = setInterval(count_up, count_speed(targetNum) / conditon_num);
  }
  let target = document.getElementById("num");
  NumberCounter(target);
}

function zero_padding(num, max_num){
  const len = parseInt(Math.log10(max_num)) + 1;
  if (len < 2) {
    len = 2;
  }
  return (Array(len).join('0') + num).slice(-len);
}

function count_speed (max_num) {
  const len = parseInt(Math.log10(max_num)) + 1;
  return parseInt(Math.pow(10, len));
}

window.addEventListener("load", number_setting);