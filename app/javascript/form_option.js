function form_option() {
  add_form();
  remove_form();
}

function buildForm(index) {
  const formHtml = `
      <div class="balance_forms">
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
          <select class="select-box" id="item-category" name="form_payments_balance_collection[payments_balances_attributes][${index}][payment_id]">
            <option value="1">現金</option>
            <option value="2">クレジット決済</option>
            <option value="3">口座振込</option></select>
          </select>
          <td class="balance_form">
            <input type="number" name="form_payments_balance_collection[payments_balances_attributes][${index}][payment_times]" placeholder="1" />
          </td>
          <td class="balance_form">
            <button type="button" class="delete-form" id="form_area_${index}" data-form-id="form_${index}">削除</button>
          </td>
        </tr>
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

function add_form() {
  let formIndex = 0;
  const addButton = document.getElementById("add-form-button");
  const formArea = document.getElementById("form_area");
  let forms = document.querySelectorAll(".balance_forms");
  let lastIndex = forms.length;
  console.log(lastIndex)

  for (let i = 1; i <= lastIndex; i++) {
    formIndex++;
  }

  addButton.addEventListener("click", () => {
    formIndex += 1;
    formArea.appendChild(buildForm(formIndex));
  });
}

function remove_form() {
  document.addEventListener('click', function(event) {
    const targetElement = event.target;
    if (targetElement.classList.contains('delete-form')) {
      event.preventDefault();
      const formId = targetElement.dataset.formId;
      const formToRemove = targetElement.closest('.balance_forms');
      console.log(formToRemove)
      if (formToRemove) {
        formToRemove.parentNode.removeChild(formToRemove);
        // フォームを削除した場合、hidden-destroyクラスを持つ要素も一緒に削除する必要があります。
        const hiddenDestroyInput = document.querySelector(`[name="form_payments_balance_collection[payments_balances_attributes][${formId}][_destroy]"]`);
        if (hiddenDestroyInput) {
          hiddenDestroyInput.parentNode.removeChild(hiddenDestroyInput);
        }
      }
    }
  });
}

window.addEventListener("load", form_option);