function form_option() {
  add_form();
}

function add_form(){
  const addButton = document.getElementById("add-form-button");
  const formArea = document.getElementById("form_area");
  let formCount = (`<%= @payments_balance.payments_balances.size %>`);

  addButton.addEventListener("click", () => {
    const formHtml = `
      <div class="balance_forms" id="form_area">
        <tr class="balance_forms">
          <td class="balance_form">
            <input type="date" name="form_payments_balance_collection[payments_balances_attributes][${formCount}][date]" />
          </td>
          <td class="balance_form">
            <input type="text" name="form_payments_balance_collection[payments_balances_attributes][${formCount}][purpose]" placeholder="まだ未実装" />
          </td>
          <td class="balance_form">
            <input type="number" name="form_payments_balance_collection[payments_balances_attributes][${formCount}][amount]" placeholder="0" />
          </td>
          <select class="select-box" id="item-category" name="form_payments_balance_collection[payments_balances_attributes][[${formCount}][payment_id]">
            <option value="1">現金</option>
            <option value="2">クレジット決済</option>
            <option value="3">口座振込</option></select>
          </select>
          <td class="balance_form">
            <input type="number" name="form_payments_balance_collection[payments_balances_attributes][${formCount}][payment_times]" placeholder="1" />
          </td>
          <td class="balance_form">
            <a href="" class="delete-form" data-form_id="${formCount}">削除</a>
          </td>
        </tr>
      </div>
    `;

    // フォームをテーブルの末尾に追加
    formArea.insertAdjacentHTML("beforeend", formHtml);
    formCount++;

    // カテゴリーの選択肢を取得して追加
    const categorySelect = document.getElementById(`item-category-${formCount - 1}`);
    const categories = (`<%= Payment.all.to_json %>`); // PaymentモデルのカテゴリーデータをJavaScriptに埋め込む方法はサーバーサイドテンプレートエンジンに依存します

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  });
}

function remove_form() {
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-form')) {
      event.preventDefault();
      const formId = event.target.dataset.formId;
      const formToRemove = document.getElementById(`form_${formId}`);
      if (formToRemove) {
        formToRemove.remove();
      }
    }
  });
}

window.addEventListener("load", form_option);