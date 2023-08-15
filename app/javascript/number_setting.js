function number_setting(){
  // 数値アニメーション
  const NumberCounter = (target) => {
    for (let i = 1; i <= 3; i++){
      let targetNum = parseInt(target.getAttribute(`data_num`));
    
      if (!targetNum) {
        return;
      }

      let data_num = null;
      let data_width = null;
      let data_low = null;
      let data_debt = null;
      let init_num = 0;
      const bar_view = document.getElementById("money-bar");
      let canvas = document.getElementById("canvas-2");
      let low_num = document.getElementById("low_num");
      let max_width = 200;
      let canvas_width = 0;
      let canvas_len = targetNum % Math.pow(10, count_len(targetNum))
      
      if (bar_view.style.display != "none") {
        const count_up1 = () => {
          target.innerText = `${zero_padding(init_num)}`;
          init_num += Math.pow(10, count_len(targetNum) - 1.5);
          if (init_num > targetNum) {
            target.innerText = targetNum;
            clearInterval(data_num);
          }
        }

        const count_up2 = () => {
          canvas.style.width = canvas_width + 'px';
          canvas_width += max_width * (canvas_len / canvas_num(targetNum / 10)) / 100;
          if(canvas_width > (max_width * (canvas_len / canvas_num(targetNum / 10)))) {
            canvas_width = max_width * (canvas_len / canvas_num(targetNum / 10));
            clearInterval(data_width);
          }
        }
  
        const count_up3 = () => {
          low_num.innerText = `${zero_padding_canvas(init_num)}`;
          init_num += Math.pow(10, count_len(targetNum) - 2);
          if (init_num > canvas_len) {
            low_num.innerText = `${zero_padding_canvas(targetNum)}`;
            clearInterval(data_low);
          }
        }

        data_num = setInterval(count_up1, 1);
        data_width = setInterval(count_up2, 1);
        data_low = setInterval(count_up3, 1);
      }
      else {
        const count_up4 = () => {
          target.innerText = parseInt(init_num);
          init_num += Math.pow(10, count_len(targetNum) - 1.5);
          if (init_num > targetNum) {
            target.innerText = targetNum;
            clearInterval(data_debt);
          }
        }
        data_debt = setInterval(count_up4, 1);
      }
      AddCamma(targetNum);
    }
  }
  let cash_num = document.getElementById("cash-current-num");
  let debt_num = document.getElementById("debt-current-num");
  let savings_num = document.getElementById("savings-current-num");

  const paymentsMode = document.getElementById("payments_mode");
  const cashNum = document.getElementById("cash-current-num");
  const debtNum = document.getElementById("debt-current-num");
  const savingsNum = document.getElementById("savings-current-num");
  const moneyBar = document.getElementById("money-bar");
  let income_num = Math.pow(10, 4) * annual_income;

  cashNum.style.display = "block";
  debtNum.style.display = "none";
  savingsNum.style.display = "none";
  moneyBar.style.display = "block";

  Stock(cash_cons, parseInt(income_num / 12 / 7));
  NumberCounter(cash_num);

  // 残高表示選択
  paymentsMode.addEventListener("change", function() {
    const selectedValue = parseInt(paymentsMode.value);
    cashNum.style.display = "none";
    debtNum.style.display = "none";
    savingsNum.style.display = "none";
    moneyBar.style.display = "none";

    switch (selectedValue) {
      case 1:
        cashNum.style.display = "block";
        moneyBar.style.display = "block";
        Stock(cash_cons, parseInt(income_num / 12 / 7));
        NumberCounter(cash_num);
        break;
      case 2:
        debtNum.style.display = "block";
        moneyBar.style.display = "none";
        NumberCounter(debt_num);
        break;
      case 3:
        savingsNum.style.display = "block";
        moneyBar.style.display = "block";
        Stock(atm_cons, parseInt(income_num));
        NumberCounter(savings_num);
        break;
      default:
        // デフォルトの表示
        cashNum.style.display = "block";
    }
  });
}

function color_change(red, green, blue) {
  return "rgb(" + red + "," + green + "," + blue + ")";
}
function zero_padding(num) {
  let len = parseInt(Math.log10(num)) + 1;
  if (len <= 2 || num <= 0) {
    len = 2;
  }
  return ('0'.repeat(len) + num).slice(-len);
}

function zero_padding_canvas(num) {

  //0埋め処理
  let pd = parseInt(Math.log10(num));
  if (pd <= 2)
  {
    pd = 2;
  }
  let pn = Math.pow(10, pd);
  let dn = (num % pn);
  let pdn = new Array;
  let n = "";
  for (let k = 1; k <= pd; k++)
  {
      pdn[k - 1] = parseInt(dn) % 10;
      dn -= pdn[k - 1];
      dn /= 10;
  }
  for (let l = parseInt(pd - 1); l >= 0; l--)
  {
      n += pdn[l].toString();
  }
  return n.toString();
}

function count_len(max_num) {
  let len = parseInt(Math.log10(max_num));
  return len;
}

function canvas_num(max_num) {
  let len = parseInt(Math.log10(max_num)) + 1;
  return Math.pow(10, len);
}

function AddCamma(num) {
  return num.toLocaleString();
}

function Stock(cons_num, max_num) {
  //数値表示処理
  let pd = parseInt(Math.log10(cons_num));
  if (pd <= 2)
  {
    pd = 2;
  }
  let pn = Math.pow(10, pd);
  // let t = parseInt(cons_num / pn);
  const stock = document.getElementById("tank");
  //ストック処理
  stock.innerHTML = "";
  if (cons_num >= 1)
  {
    for (let i = 1; i < 10; i++)
    {
      if (max_num >= pn * i)
      {
        if (cons_num >= pn * i)
        {
          stock.innerHTML += "■"; // 健全
        }
        else
        {
          stock.innerHTML += "・"; // 消失
        }
      }
      else
      {
        stock.innerHTML += " "; // 最初からない
      }
    }
  }
  else
  {
    for (let i = 1; i < 10; i++)
    {
      stock.innerHTML += "・";
    }
  }
  return stock;
}

window.addEventListener("load", number_setting);