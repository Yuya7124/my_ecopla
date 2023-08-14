function main_page() {
  const paymentsMode = document.getElementById("payments_mode");
  const Modename = document.getElementById("mode-name");

  paymentsMode.addEventListener("change", function() {
    const selectedValue = parseInt(paymentsMode.value);

    switch (selectedValue) {
      case 1:
        Modename.innerHTML = "現金残高";
        break;
      case 2:
        Modename.innerHTML = "借金残高";
        break;
      case 3:
        Modename.innerHTML = "口座残高";
        break;
      default:
        // デフォルトの表示
        Modename.innerHTML = "現金";
    }
  });
}

window.addEventListener('load', main_page); 