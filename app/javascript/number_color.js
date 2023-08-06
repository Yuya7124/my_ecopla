function number_color() {
  month_calendar_amount();
}

// メイン画面
function month_calendar_amount() {
  //出費額段階
  let OutPut_Lv_1 = 500;
  let OutPut_Lv_2 = 1000;
  let OutPut_Lv_3 = 5000;
  let OutPut_Lv_4 = 7500;
  let OutPut_Lv_5 = 10000;
  for (let day = 1; day <= 31; day++){
    const DayNum = document.getElementById(`amount-num-${day}`);
    if (DayNum != null){
      const day_value = DayNum.innerText;
      let value_parcent = Math.abs(day_value) / 255;
      if (day_value < 0)
      DayNum.style.color = color_change(0, 0, value_parcent);
    }
  } 
}

function color_change(red, green, blue) {
  return "rgb(" + red + "," + green + "," + blue + ")";
}


window.addEventListener('load', number_color); 