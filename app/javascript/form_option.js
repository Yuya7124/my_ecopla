function form_option() {
  let formIndex = [];
  const addButton = document.getElementById("add-form-button");
  const formArea = document.getElementById("form-area");
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
        const deletedFormIdsInput = document.getElementById("deleted-form-ids");
        deletedFormIdsInput.value += "," + formId;
      }
    }
  });
}

// buildForm関数を変更し、selectedValueを受け取るようにする
function buildForm(index) {
  const formHtml = `
    <tr class="balance_forms">
      <td class="balance_form">
        <input type="date" name="form_payments_balance_collection[payments_balances_attributes][${index}][date]" />
      </td>
      <td class="balance_form" id="new-select-purpose-${index}">
        <select id="new-parent-category-${index}" name="form_payments_balance_collection[payments_balances_attributes][${index}][purpose_id]">
          <option value="">---</option>
          <option value="1">収入</option>
          <option value="2">支出</option>
        </select>
      </td>
      <td class="balance_form">
        <input type="number" name="form_payments_balance_collection[payments_balances_attributes][${index}][amount]" placeholder="0" />
      </td>
      <select class="select_box" id="item-category" name="form_payments_balance_collection[payments_balances_attributes][${index}][payment_id]">
        <option value="1">現金</option>
        <option value="2">クレジット決済</option>
        <option value="3">口座振込</option>
      </select>
      <td class="balance_form">
        <button type="button" class="delete_form" id="payments_balance_deleted_form_ids" data-form-id="form_${index}">削除</button>
      </td>
    </tr>
    <input type="hidden" name="payments_balance[${index}]" id="payments-balance-${index}">
  `;
  const formNode = document.createElement("tr");
  formNode.innerHTML = formHtml;
  
  const selectWrap = formNode.querySelector(`#new-select-purpose-${index}`);
  const parentCategory = formNode.querySelector(`#new-parent-category-${index}`);
  const newNameAttribute = `form_payments_balance_collection[payments_balances_attributes][${index}][purpose_id]`;
  
  console.log(parentCategory)

  // 選択フォームを繰り返し表示
  const selectChildElement = (selectForm) => { 
    if (document.getElementById(selectForm) !== null) {
      console.log(selectForm)
      document.getElementById(selectForm).remove()
    }
  }

  // Ajax通信
  const XHR = new XMLHttpRequest();
  
  const categoryXHR = (id) => {
    XHR.open("GET", `/purpose/${id}`, true);
    XHR.responseType = "json";
    XHR.send();
  }

  // 子カテゴリーの値取得
  const getChildCategoryData = () => {
    const parentValue = parentCategory.value;
    categoryXHR(parentValue);

    XHR.onload = () => {
      const purposes = XHR.response.purpose;
      console.log(purposes);

      // 既存の孫カテゴリーのプルダウンを削除
      const grandchildWrap = formNode.querySelector(`#new-grand-child-select-wrap-${index}`);
      if (grandchildWrap) {
        grandchildWrap.remove();
      }
      
      appendChildSelect(purposes);
      
      const childCategory = formNode.querySelector(`#new-child-select-${index}`);

      childCategory.addEventListener('change', () => {
        selectChildElement(`new-grand-child-select-wrap-${index}`);
        getGrandchildCategoryData(childCategory);
      });
    }
  }
  
  //子カテゴリーのプルダウン
  const appendChildSelect = (purposes) => {
    const childWrap = document.createElement('td');
    const childSelect = document.createElement('select');
    console.log(selectWrap)

    childWrap.setAttribute('id', `new-child-select-wrap-${index}`);
    childWrap.setAttribute('class', 'c_select_w');

    childSelect.setAttribute('id', `new-child-select-${index}`);
    childSelect.setAttribute('class', 'c_select');
    childSelect.setAttribute('name', newNameAttribute);

    purposes.forEach(purpose => {
      const childOption = document.createElement('option');
      childOption.innerHTML = purpose.name;
      childOption.setAttribute('value', purpose.id);
      childSelect.appendChild(childOption);
    });

    childWrap.appendChild(childSelect);
    selectWrap.appendChild(childWrap);
  }

  // 孫カテゴリーの値取得
  const getGrandchildCategoryData = (grandchildCategory) => {
    const grandchildValue = grandchildCategory.value;
    categoryXHR(grandchildValue);

    XHR.onload = () => {
    const GrandChildItems = XHR.response.purpose;
    console.log(GrandChildItems.length);
    if (GrandChildItems.length != 0) {
      appendGrandChildSelect(GrandChildItems);
    }
  }
}

  //孫カテゴリーのプルダウン
  const appendGrandChildSelect = (purposes) => {

    const childWrap = formNode.querySelector(`#new-child-select-wrap-${index}`)
    const grandchildWrap = document.createElement('td')
    const grandchildSelect = document.createElement('select')
    

    console.log(selectWrap)

    grandchildWrap.setAttribute('id', `new-grand-child-select-wrap-${index}`);
    grandchildWrap.setAttribute('class', 'c_select_w');

    grandchildSelect.setAttribute('id', `new-grand-child-select-${index}`)
    grandchildSelect.setAttribute('class', 'c_select');
    grandchildSelect.setAttribute('name', newNameAttribute);

    purposes.forEach(purpose => {
      const grandchildOption = document.createElement('option');
      grandchildOption.innerHTML = purpose.name;
      grandchildOption.setAttribute('value', purpose.id);
      grandchildSelect.appendChild(grandchildOption);
    });

    grandchildWrap.appendChild(grandchildSelect)
    childWrap.appendChild(grandchildWrap)
  }

  parentCategory.addEventListener("change", () => {
    
    // 以前に設定した子カテゴリーの処理を一旦削除
    selectChildElement(`new-child-select-wrap-${index}`);
    getChildCategoryData();
  });
  // 
  

  return formNode;
}

window.addEventListener("load", form_option);
