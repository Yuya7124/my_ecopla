function form_option() {
  add_form();
  remove_form();
}

function buildForm(index) {
  const formHtml = `
      <div class="balance_forms" id="form_area" data-form_id="${index}>
        <tr class="balance_forms">
          <td class="balance_form">
            <input type="date" name="form_payments_balance_collection[payments_balances_attributes][${index}][date]" />
          </td>
          <td class="balance_form">
            <input type="text" name="form_payments_balance_collection[payments_balances_attributes][${index}][purpose]" placeholder="まだ未実装" />
          </td>
          <td class="balance_form">
            <input type="number" name="form_payments_balance_collection[payments_balances_attributes][${index}][amount]" placeholder="0" />
          </td>
          <select class="select-box" id="item-category" name="form_payments_balance_collection[payments_balances_attributes][[${index}][payment_id]">
            <option value="1">現金</option>
            <option value="2">クレジット決済</option>
            <option value="3">口座振込</option></select>
          </select>
          <td class="balance_form">
            <input type="number" name="form_payments_balance_collection[payments_balances_attributes][${index}][payment_times]" placeholder="1" />
          </td>
          <td class="balance_form">
            <span class="delete-form">削除する</span>
          </td>
        </tr>
      </div>
    `;
  return formHtml;
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

function add_form() {
  let formIndex = [0];
  let obj = {}
  let lastIndex = $(".balance_forms:last").data("data-index");
  for (let i = 0; i <= lastIndex; i++) {
    formIndex.push(i);
  }

  let formCount = $(".delete-form").length;
  let displayCount = $(".balance_forms").length;
  

  $(".hidden-destroy").hide();

  const addButton = $("#add-form-button");
  const formArea = $("#form_area");

  addButton.on("click", async () => {
    // フォーム追加
    formArea.append(buildForm(formIndex[0]));
    formIndex.shift();

    // カテゴリーの選択肢を取得して追加
    // const index = $(".balance_forms").length - 1;
    // const categorySelect = $(`#item-category-${index}`);
    // const categories = await fetchCategories();

    // categories.forEach((category) => {
    //   const option = buildOptionElement(category);
    //   categorySelect.append(option);
    // });
    displayCount += 1;
  });
};

function remove_form() {
  $(document).on('click', '.delete-form', function(event) {
    event.preventDefault();
    const formId = $(this).data('formId');
    const formToRemove = $(`#form_${formId}`);
    if (formToRemove.length > 0) {
      formToRemove.closest('.balance_forms').remove();
    }
  });
}

window.addEventListener("load", form_option);