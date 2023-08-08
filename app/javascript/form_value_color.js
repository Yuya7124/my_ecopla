// import {color_label, removeComma} from number_color;

function form_value_color() {
  const formInputs = document.querySelectorAll('.form_date, .form_purpose, .form_amount, .form_payment');
  for (let pblist = 0; pblist < formInputs.length; pblist++){
    const PbListParent = document.querySelectorAll('.form_purpose');
    const PbListAmount = document.getElementById(`inputform-amount-${pblist}`);
    if (PbListAmount != null){
      const pbl_value = PbListAmount.value;
      const pbl_num = removeComma(pbl_value);
      if (PbListParent.item(pblist).value != 1 || PbListParent.item(pblist).value != 3) {
        PbListAmount.style.color = color_label(pbl_value);
        PbListAmount.addEventListener('change', () => {
          PbListAmount.style.color = color_label(PbListAmount.value);
        }); 
      }
    }
  }
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

function removeComma(number) {
  var removed = number.replace(/,/g, '');
  return parseInt(removed, 10);
}
document.addEventListener('input', form_value_color);

window.addEventListener('load', form_value_color); 