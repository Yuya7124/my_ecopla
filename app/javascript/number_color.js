function number_color() {
  month_calendar_amount();
  balance_setting();
}

// メイン画面
function month_calendar_amount() {
  for (let day = 0; day < 42; day++){
    const DayNum = document.getElementById(`amount-num-${day}`);
    if (DayNum != null){
      const day_value = DayNum.innerText;
      const day_num = removeComma(day_value);
      DayNum.style.color = color_label(day_num);
    }  
  } 
}

// 詳細画面
function balance_setting() {
  for (let pb = 0; pb < 100; pb++){
    const PbNum = document.getElementById(`pb-amount-num-${pb}`);
    if (PbNum != null){
      const pb_value = PbNum.innerText;
      const pb_num = removeComma(pb_value);
      PbNum.style.color = color_label(pb_num);
    }  
  }
  // 支出
  const ExpendNum = document.getElementById("expend-num");
  const expend_value = ExpendNum.innerText;
  const expend_num = removeComma(expend_value);
  ExpendNum.style.color = color_label(expend_num);
  // 合計値
  const TotalAmount = document.getElementById("total-amount-num");
  const total_amount_value = TotalAmount.innerText;
  const total_amount_num = removeComma(total_amount_value);
  TotalAmount.style.color = color_label(total_amount_num);
}

function color_change(red, green, blue) {
  return "rgb(" + red + "," + green + "," + blue + ")";
}

function color_label(color) {
  //出費額段階
  const OutPut_Lv_1 = 500;
  const OutPut_Lv_2 = 1000;
  const OutPut_Lv_3 = 5000;
  const OutPut_Lv_4 = 7500;
  const OutPut_Lv_5 = 10000;
  
  //表示色
  let r = 255;
  let g = 255;
  let b = 255;

  if (color < OutPut_Lv_1)
  {   //白
      r = 255;
      g = 255;
      b = 255;
      
  }
  else if (color >= OutPut_Lv_1 && color < OutPut_Lv_2)
  {   //白→黄
      r = 255;
      g = 255;
      b = 255 - (color - 0) * 255 / (OutPut_Lv_2 - 0);
  }
  else if (color >= OutPut_Lv_2 && color < OutPut_Lv_3)
  {   //黄→赤
      r = 255;
      g = 255 - (color - OutPut_Lv_2) * 255 / (OutPut_Lv_3 - OutPut_Lv_2);
      b = 0;
  }
  else if (color >= OutPut_Lv_3 && color < OutPut_Lv_4)
  {   //赤→紫
      r = 255 - (color - OutPut_Lv_3) * 255 / (OutPut_Lv_5 - OutPut_Lv_3);
      g = 0;
      b = (color - OutPut_Lv_3) * 255 / (OutPut_Lv_5 - OutPut_Lv_3);
  }
  else if (color >= OutPut_Lv_4 && color < OutPut_Lv_5)
  {   //紫→黒
      r = 255 - (color - OutPut_Lv_3) * 255 / (OutPut_Lv_5 - OutPut_Lv_3);
      g = 0;
      b = 255 - (color - OutPut_Lv_3) * 255 / (OutPut_Lv_5 - OutPut_Lv_3);
  }
  else
  {   //黒
      r = 0;
      g = 0;
      b = 0;
  }
  return color_change(r, g, b)
}


function color_bar(per_max, per_min) {
  const ascending = (255 / (per_max - per_min)) * (per_max - parseInt(per_num));
  const descending = 255 - ascending;
  if (per_num >= 100)
  {   //青
      r = 0;
      g = 0;
      b = 255;
  }
  if (per_num < 100 && per_num >= 87)
  {   //青→水
      r = 0;
      g = g + parseInt(ascending);
      b = 255;
  }
  if (per_num < 87 && per_num >= 75)
  {   //水→緑
      r = 0;
      g = 255;
      b = parseInt(descending) - b;
  }
  if (per_num < 75 && per_num >= 50)
  {   //緑→黄
      r = parseInt(ascending) * 1.5;
      g = 255;
      b = 0;
  }
  if (per_num < 50 && per_num >= 25)
  {   //黄→赤
      r = 255;
      g = parseInt(descending) - g * 1.5;
      b = 0;
  }
  if (per_num < 25 && per_num >= 13)
  {   //赤→紫
      r = parseInt(descending) - r * 1.5;
      g = 0;
      b = parseInt(descending) + b * 1.5;
  }
  if (per_num < 13 && per_num > 0)
  {   //紫→黒
      r = parseInt(descending) - r * 1.5;
      g = 0;
      b = parseInt(descending) - b * 1.5;
  }
  if (per_num <= 0)
  {   //黒
      r = 0;
      g = 0;
      b = 0;
  }
  //255を超えた時
  if (r > 255)
  {
      r = 255;
  }
  if (g > 255)
  {
      g = 255;
  }
  if (b > 255)
  {
      b = 255;
  }
  //0未満のとき
  if (r < 0)
  {
      r = 0;
  }
  if (g < 0)
  {
      g = 0;
  }
  if (b < 0)
  {
      b = 0;
  }
}

function removeComma(number) {
  var removed = number.replace(/,/g, '');
  return parseInt(removed, 10);
}

window.addEventListener('load', number_color); 