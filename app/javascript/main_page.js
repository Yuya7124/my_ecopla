function main_page() {
  const paymentsMode = document.getElementById("payments_mode");
  const cashNum = document.getElementById("cash-current-num");
  const debtNum = document.getElementById("debt-current-num");
  const savingsNum = document.getElementById("savings-current-num");

  cashNum.style.display = "block";
  debtNum.style.display = "none";
  savingsNum.style.display = "none";

  paymentsMode.addEventListener("change", function() {
    const selectedValue = parseInt(paymentsMode.value);
    console.log(selectedValue)

    cashNum.style.display = "none";
    debtNum.style.display = "none";
    savingsNum.style.display = "none";

    switch (selectedValue) {
      case 1:
        cashNum.style.display = "block";
        break;
      case 2:
        debtNum.style.display = "block";
        break;
      case 3:
        savingsNum.style.display = "block";
        break;
      default:
        // デフォルトの表示
        cashNum.style.display = "block";
    }
  });
}

// window.addEventListener('DOMContentLoaded', main_page); 