function form_option() {
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
    const deletedFormIdsInput = document.getElementById("deleted_form_ids");
    deletedFormIdsInput.value += "," + formIndex[lastIndex - 2];

    // 新しく追加されたフォームに対してイベントリスナーを設定
    const newIndex = lastIndex - 2;
    const newParentCategory = document.getElementById(`new-parent-category-${newIndex}`);
    newParentCategory.addEventListener('change', () => {
      selectChildElement(`new-child-select-wrap-${newIndex}`);
      getChildCategoryData(newIndex);
    });
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
        // フォームを削除した場合、hidden-destroyクラスを持つ要素も一緒に削除
        const hiddenDestroyInput = document.querySelector(`[name="form_payments_balance_collection[payments_balances_attributes][${formId}][_destroy]"]`);
        if (hiddenDestroyInput) {
          hiddenDestroyInput.value = "1";
          hiddenDestroyInput.parentNode.removeChild(hiddenDestroyInput);
        }
        // 非表示のフィールドから削除したフォームIDをカンマで区切って追加
        const deletedFormIdsInput = document.getElementById("deleted_form_ids");
        deletedFormIdsInput.value += "," + formId;
      }
    }
  });
}

function appendGrandChildSelect(purposes, index) {
  const childWrap = document.getElementById(`new-child-select-wrap-${index}`);
  const grandchildWrap = document.createElement('td');
  const grandchildSelect = document.createElement('select');

  grandchildWrap.setAttribute('id', `new-grand-child-select-wrap-${index}`);
  grandchildWrap.setAttribute('class', 'c_select_w');

  grandchildSelect.setAttribute('id', `new-grand-child-select-${index}`);
  grandchildSelect.setAttribute('class', 'c_select');
  grandchildSelect.setAttribute('name', `form_payments_balance_collection[payments_balances_attributes][${index}][grandchild_id]`);

  purposes.forEach(purpose => {
    const grandchildOption = document.createElement('option');
    grandchildOption.innerHTML = purpose.name;
    grandchildOption.setAttribute('value', purpose.id);
    grandchildSelect.appendChild(grandchildOption);
  });

  grandchildWrap.appendChild(grandchildSelect);
  childWrap.appendChild(grandchildWrap);
}

function getChildCategoryData(index) {
  const parentValue = parentCategory.value;
  categoryXHR(parentValue);

  XHR.onload = () => {
    const purposes = XHR.response.purpose;
    console.log(purposes);

    // 既存の孫カテゴリーのプルダウンを削除
    const grandchildWrap = document.getElementById(`new-grand-child-select-wrap-${index}`);
    if (grandchildWrap) {
      grandchildWrap.remove();
    }
    
    appendChildSelect(purposes, index);

    const childCategory = document.getElementById(`new-child-select-${index}`);
    childCategory.addEventListener('change', () => {
      selectChildElement(`new-grand-child-select-wrap-${index}`);
      getGrandchildCategoryData(childCategory, index);
    });
  }
}

function buildForm(index) {
  const formHtml = `
    <tr class="balance_forms">
      <td class="balance_form">
        <input type="date" name="form_payments_balance_collection[payments_balances_attributes][${index}][date]" />
      </td>
      <td class="balance_form" id="new-select_purpose-${index}">
        <select id="new-parent-category-${index}" name="form_payments_balance_collection[payments_balances_attributes][${index}][purpose_id]">
          <option value="">---</option>
          <option value="1">収入</option>
          <option value="2">支出</option>
        </select>
      </td>
      <td class="balance_form">
        <input type="number" name="form_payments_balance_collection[payments_balances_attributes][${index}][amount]" placeholder="0" />
      </td>
      <td class="balance_form">
        <select class="select-box" id="item-category" name="form_payments_balance_collection[payments_balances_attributes][${index}][payment_id]">
          <option value="1">現金</option>
          <option value="2">クレジット決済</option>
          <option value="3">口座振込</option>
        </select>
      </td>
      <td class="balance_form">
        <button type="button" class="delete-form" id="payments_balance_deleted_form_ids" data-form-id="form_${index}">削除</button>
      </td>
    </tr>
    <input type="hidden" name="payments_balance[${index}]" id="payments_balance_${index}">
  `;
  const formNode = document.createElement("tr");
  formNode.innerHTML = formHtml;
  return formNode;
}

// // formAreaにフォームを追加する例
// const addButton = document.getElementById("add-form-button");
// const formArea = document.getElementById("form_area");
// let formIndex = 0;

// addButton.addEventListener("click", () => {
//   formArea.appendChild(buildForm(formIndex));
//   formIndex++;
// });


window.addEventListener("load", form_option);
