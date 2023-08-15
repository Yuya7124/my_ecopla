function number_color() {
  annual_income = annual_income * Math.pow(10, 4);
  
  month_calendar_amount(annual_income);
  
  balance_setting(annual_income);
  cash_value_bar(annual_income);
  const paymentsMode = document.getElementById("payments_mode");

  paymentsMode.addEventListener("change", function() {
    const selectedValue = parseInt(paymentsMode.value);
    switch (selectedValue) {
      case 1:
        cash_value_bar(annual_income);
        break;
      case 2:
        debt_value_bar(annual_income);
        break;
      case 3:
        savings_value_bar(annual_income);
        break;
      default:
        // デフォルトの表示
        cash_value_bar(annual_income);
    }
  });
}

// メイン画面
function cash_value_bar(annual_income) {
  color_bar_view((cash_cons / (annual_income / 12 / 7)) * 100);
}

function debt_value_bar(annual_income) {
  const debtNum = document.getElementById("debt-current-num");
  debtNum.style.color = color_label(debt_future, annual_income);
}

function savings_value_bar(annual_income) {
  color_bar_view((atm_cons / (annual_income / 12)) * 100);
}

// カレンダー
function month_calendar_amount(annual_income) {
  for (let day = 0; day < 42; day++){
    const DayNum = document.getElementById(`amount-num-${day}`);
    if (DayNum != null){
      const day_value = DayNum.innerText;
      const day_num = removeComma(day_value);
      DayNum.style.color = color_label(day_num, annual_income);
    }  
  } 
}

// 詳細画面
function balance_setting(annual_income) {
  for (let pb = 0; pb < 100; pb++){
    const PbNum = document.getElementById(`pb-amount-num-${pb}`);
    if (PbNum != null){
      const pb_value = PbNum.innerText;
      const pb_num = removeComma(pb_value);
      PbNum.style.color = color_label(pb_num, annual_income);
    }  
  }
  // 支出
  const ExpendNum = document.getElementById("expend-num");
  if (ExpendNum != null) {
    const expend_value = ExpendNum.innerText;
    const expend_num = removeComma(expend_value);
    ExpendNum.style.color = color_label(expend_num, annual_income);
  }
  
  // 合計値
  const TotalAmount = document.getElementById("total-amount-num");
  if (TotalAmount != null) {
    const total_amount_value = TotalAmount.innerText;
    const total_amount_num = removeComma(total_amount_value);
    TotalAmount.style.color = color_label(total_amount_num, annual_income);
  }
}

function color_change(red, green, blue) {
  return "rgb(" + red + "," + green + "," + blue + ")";
}

function color_label(color, annual_income) {
  //出費額段階
  const week_income = annual_income / 12 / 7
  const OutPut_Lv_1 = week_income / 10;
  const OutPut_Lv_2 = week_income / 8;
  const OutPut_Lv_3 = week_income / 3.2;
  const OutPut_Lv_4 = week_income / 2;
  
  //表示色
  let r = 255;
  let g = 255;
  let b = 255;

  if (color < OutPut_Lv_1)
  {   //白→黄
      r = 255;
      g = 255;
      b = 255 - (color - 0) * 255 / (OutPut_Lv_1 - 0);
  }
  else if (color >= OutPut_Lv_1 && color < OutPut_Lv_2)
  {   //黄→赤
      r = 255;
      g = 255 - (color - OutPut_Lv_1) * 255 / (OutPut_Lv_2 - OutPut_Lv_1);
      b = 0;
  }
  else if (color >= OutPut_Lv_2 && color < OutPut_Lv_3)
  {   //赤→紫
      r = 255 - (color - OutPut_Lv_2) * 255 / (OutPut_Lv_4 - OutPut_Lv_2);
      g = 0;
      b = (color - OutPut_Lv_2) * 255 / (OutPut_Lv_4 - OutPut_Lv_2);
  }
  else if (color >= OutPut_Lv_3 && color < OutPut_Lv_4)
  {   //紫→黒
      r = 255 - (color - OutPut_Lv_2) * 255 / (OutPut_Lv_4 - OutPut_Lv_2);
      g = 0;
      b = 255 - (color - OutPut_Lv_2) * 255 / (OutPut_Lv_4 - OutPut_Lv_2);
  }
  else
  {   //黒
      r = 0;
      g = 0;
      b = 0;
  }
  return color_change(r, g, b)
}

function color_bar_view(per_num) {
  const alert_text = document.getElementById("alert");
  if (per_num >= 100) {   //青
    color_bar(100, 100, per_num);
  }
  if (per_num < 100 && per_num >= 87) {   //青→水
    color_bar(100, 87, per_num);
  }
  if (per_num < 87 && per_num >= 75) {   //水→緑
    color_bar(87, 75, per_num);
  }
  if (per_num < 75 && per_num >= 50) {   //緑→黄
    color_bar(75, 50, per_num);
  }
  if (per_num < 50 && per_num >= 25) {   //黄→赤
    color_bar(50, 25, per_num);
    alert_text.innerText = "CAUTION!";
  }
  if (per_num < 25 && per_num > 0) {   //赤→黒
    color_bar(25, 0, per_num);
    alert_text.innerText = "!WARNING!";
  }
  if (per_num <= 0) {   //黒
    color_bar(0, 0, per_num);
    alert_text.innerText = "EMPTY";
  }
}

function color_bar(per_max, per_min, per_num) {
  const canvas = document.getElementById("canvas-2");
  const low_num = document.getElementById("low_num");
  const tank = document.getElementById("tank");
  const alert_text = document.getElementById("alert");
  const cashNum = document.getElementById("cash-current-num");
  const savingsNum = document.getElementById("savings-current-num");

  const ascending = (255 / (per_max - per_min)) * (per_max - parseInt(per_num));
  const descending = 255 - ascending;

  //表示色
  let r = 0;
  let g = 0;
  let b = 255;

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
  if (cashNum != null) {
    cashNum.style.color = color_change(r, g, b);
    canvas.style.backgroundColor = color_change(r, g, b);
    low_num.style.color = color_change(r, g, b);
    tank.style.color = color_change(r, g, b);
    alert_text.style.color = color_change(r, g, b);
  }
  if (savingsNum != null) {
    savingsNum.style.color = color_change(r, g, b);
    canvas.style.backgroundColor = color_change(r, g, b);
    low_num.style.color = color_change(r, g, b);
    tank.style.color = color_change(r, g, b);
    alert_text.style.color = color_change(r, g, b);
  }
}

function removeComma(number) {
  var removed = number.replace(/,/g, '');
  return parseInt(removed, 10);
}

window.addEventListener('load', number_color); 