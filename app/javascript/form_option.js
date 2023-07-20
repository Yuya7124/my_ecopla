function form_option() {
  //payments_balance要素数
  const paymentsBalanceData = document.getElementById('payments-balance-data');
  const paymentCount = parseInt(paymentsBalanceData.dataset.paymentCount, 10);
  console.log("Payments Balance Count:", paymentCount);

  let formIndex = [];
  const addButton = document.getElementById("add-form-button");
  const formArea = document.getElementById("form_area");
  let forms = document.querySelectorAll(".balance_forms");
  let lastIndex = forms.length;

  for (let i = 1; i < lastIndex; i++) {
    formIndex.push(i);
  }

  //フォーム追加
  addButton.addEventListener("click", () => {
    formArea.appendChild(buildForm(formIndex[lastIndex - 2]));
    formIndex.push(lastIndex);
    lastIndex++;  
    // 新しいフォームのindexを非表示のフィールドに設定
    const deletedFormIdsInput = document.getElementById("payments_balance_deleted_form_ids");
    deletedFormIdsInput.value += "," + formIndex[lastIndex - 2];
    console.log(deletedFormIdsInput)
  });

  //フォーム削除
  document.addEventListener('click', function(event) {
    const targetElement = event.target;
    if (targetElement.classList.contains('delete-form')) {
      event.preventDefault();
      const formId = parseInt(targetElement.dataset.formid, 10);
      const formToRemove = targetElement.closest('.balance_forms');
      if (formToRemove) {
        formToRemove.style.display = "none";
        formToRemove.parentNode.removeChild(formToRemove);
        // フォームを削除した場合、hidden-destroyクラスを持つ要素も一緒に削除する必要があります。
        const hiddenDestroyInput = document.querySelector(`[name="form_payments_balance_collection[payments_balances_attributes][${formId}][_destroy]"]`);
        if (hiddenDestroyInput) {
          hiddenDestroyInput.value = "1";
          hiddenDestroyInput.parentNode.removeChild(hiddenDestroyInput);
        }
        // 非表示のフィールドから削除したフォームIDをカンマで区切って追加
        const deletedFormIdsInput = document.getElementById("payments_balance_deleted_form_ids");
        deletedFormIdsInput.value += "," + formId;
        console.log(deletedFormIdsInput)
      }
    }
  });
}

function buildForm(index) {
  const formHtml = `
      <div class="balance_forms">
        <tr>
          <td class="balance_form">
            <input type="date" name="form_payments_balance_collection[payments_balances_attributes][${index}][date]" />
          </td>
          <td class="balance_form">
            <input type="text" name="form_payments_balance_collection[payments_balances_attributes][${index}][purpose]" placeholder="まだ未実装" />
          </td>
          <td class="balance_form">
            <input type="number" name="form_payments_balance_collection[payments_balances_attributes][${index}][amount]" placeholder="0" />
          </td>
          <select class="select-box" id="item-category" name="form_payments_balance_collection[payments_balances_attributes][${index}][payment_id]">
            <option value="1">現金</option>
            <option value="2">クレジット決済</option>
            <option value="3">口座振込</option></select>
          </select>
          <td class="balance_form">
            <button type="button" class="delete-form" id="payments_balance_deleted_form_ids" data-form-id="form_${index}">削除</button>
          </td>
        </tr>
        <input type="hidden" name="payments_balance[${index}]" id="payments_balance_${index}">
      </div>
    `;
  const formNode = document.createElement("div");
  formNode.innerHTML = formHtml;
  return formNode;
}

const fetchCategories = async () => {
  const response = await fetch('/api/categories');
  const data = await response.json();
  return data;
};

const buildOptionElement = (category) => {
  const option = $('<option></option>');
  option.val(category.id);
  option.text(category.name);
  return option;
};

window.addEventListener("load", form_option);
