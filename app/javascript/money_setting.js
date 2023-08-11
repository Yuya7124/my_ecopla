function money_setting() {
  const UserCash = document.getElementById("user-cash");
  const UserOverShort = document.getElementById("user-over-short");
  const UserDebt = document.getElementById("user-debt");
  const UserSavings = document.getElementById("user-savings");

  function updateAmount() {
    const TotalCurrentAmount = document.getElementById("total-current-amount");
    const TotalExactAmount = document.getElementById("total-exact-amount");
    const total_amount = UserCash.value - user_sum_cash;
    const exact_num = total_amount - UserOverShort.value;

    TotalCurrentAmount.innerHTML = `${total_amount.toLocaleString()}`;
    TotalExactAmount.innerHTML = `${exact_num.toLocaleString()}`;
  }

  function updateDebt() {
    const DebtFuture = document.getElementById("debt_future");
    const debt = parseInt(UserDebt.value) + parseInt(user_debt_future);
    DebtFuture.innerHTML = `${debt.toLocaleString()}`;
  }

  function updateSavings() {
    const CurrentSavings = document.getElementById("current_savings");
    const atm = parseInt(UserSavings.value) - parseInt(user_sum_atm);
    CurrentSavings.innerHTML = `${atm.toLocaleString()}`;
  }

  UserCash.addEventListener("click", updateAmount);
  UserOverShort.addEventListener("click", updateAmount);
  UserDebt.addEventListener("click", updateDebt);
  UserSavings.addEventListener("click", updateSavings);
}

window.addEventListener("load", money_setting);
