function form_option() {
  let formIndex = [];
  const addButton = document.getElementById("add-form-button");
  const formArea = document.getElementById("form-area");
  let forms = document.querySelectorAll(".balance_forms");
  let lastIndex = forms.length;
  const NewsubmitButton = document.getElementById("save-button");
  const NewsubmitButtonDeactive = document.getElementById("save-button-deactive");
  const UpdatesubmitButton = document.getElementById("update-button");
  const UpdatesubmitButtonDeactive = document.getElementById("update-button-deactive");
  let allInputsFilled = true;

  for (let i = 1; i < lastIndex; i++) {
    formIndex.push(i);
  }

  //フォーム追加
  addButton.addEventListener("click", () => {
    formArea.appendChild(buildForm(formIndex[lastIndex - 2]));
    formIndex.push(lastIndex);
    lastIndex++;  
    // 新しいフォームのindexを非表示のフィールドに設定
    allInputsFilled = false;
    const deletedFormIdsInput = document.getElementById("deleted-form-ids");
    deletedFormIdsInput.value += "," + formIndex[lastIndex - 2];

    // 登録ボタンの表示を更新する関数
    const updateSubmitButtonDisplay = () => {
      if (allInputsFilled) {
        if (NewsubmitButton != null){
          NewsubmitButton.style.display = "block";
          NewsubmitButtonDeactive.style.display = "none";
        }
        if (UpdatesubmitButton != null) {
          UpdatesubmitButton.style.display = "block";
          UpdatesubmitButtonDeactive.style.display = "none";
        }
      } else {
        if (NewsubmitButton != null){
          NewsubmitButton.style.display = "none";
          NewsubmitButtonDeactive.style.display = "block";
        }
        if (UpdatesubmitButton != null) {
          UpdatesubmitButton.style.display = "none";
          UpdatesubmitButtonDeactive.style.display = "block";
        }
      }
    };
    
    document.addEventListener('input', event => {
      const target = event.target;
      if (target.matches('.form_date, .form_purpose, .form_amount, .form_payment')) {
        const newformInputs = document.querySelectorAll('.form_date, .form_purpose, .form_amount, .form_payment');
        allInputsFilled = true;
        
        newformInputs.forEach(input => {
          if (input.value === '') {
            allInputsFilled = false;
          }
        });
        updateSubmitButtonDisplay();
      }
    });

    // 追加ボタンを押した際にも登録ボタンの表示を更新
    updateSubmitButtonDisplay();
  });
  

  //フォーム削除
  document.addEventListener('click', function(event) {
    const targetElement = event.target;
    if (targetElement.classList.contains('delete-form')) {
      event.preventDefault();
      const formId = parseInt(targetElement.dataset.formid, 10);
      const formToRemove = targetElement.closest('.payments_balance_table');
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
        if (deletedFormIdsInput != null){
          deletedFormIdsInput.value += "," + formId;
        }
        else {
          if (NewsubmitButton != null){
            NewsubmitButton.style.display = "none";
            NewsubmitButtonDeactive.style.display = "block";
          }
        }
      }
    }
  });
}

// buildForm関数を変更し、selectedValueを受け取るようにする
function buildForm(index) {
  const formHtml = `
  <table class="payments_balance_table">
    <thead class="tb_columns">
      <tr class="tb_column">
        <th class="tb_date">    日付     </th>
        <th class="tb_purpose"> 使用目的 </th>
        <th class="tb_amount">  金額     </th>
        <th class="tb_payment"> 決済方法 </th>
        <th class="tb_delete"></th>
      </tr>
    </thead>
    <tbody class="balances_list">
      <tr class="balance_forms">
        <td class="balance_form_date">
          <input type="date" name="form_payments_balance_collection[payments_balances_attributes][${index}][date]" class="form_date" id="inputform-date-${index}" />
        </td>
        <td class="balance_form_purpose" id="new-select-purpose-${index}">
          <select id="new-parent-category-${index}" class="form_purpose" name="form_payments_balance_collection[payments_balances_attributes][${index}][purpose_id]">
            <option value="">---</option>
            <option value="1">収入</option>
            <option value="2">支出</option>
            <option value="3">貯金</option>
            <option value="4">チャージ</option>
          </select>
        </td>
        <td class="balance_form_amount">
          <input type="number" class="form_amount" id="inputform-amount-${index}" style="text-align:right" name="form_payments_balance_collection[payments_balances_attributes][${index}][amount]" placeholder="0" />
        </td>
        <td class="balance_form_payment">
          <select class="form_payment" id="payment-category-${index}" name="form_payments_balance_collection[payments_balances_attributes][${index}][payment_id]">
            <option value="1">現金</option>
            <option value="2">クレジット決済</option>
            <option value="3">口座振込</option>
          </select>
        </td>
        <td class="balance_form_delete">
          <button type="button" class="delete-form" id="deleted-form-ids" data-form-id="form_${index}">×</button>
        </td>
      </tr>
      <input type="hidden" name="payments_balance[${index}]" id="payments-balance-${index}">
    </tbody>
  </table>
  `;
  const formNode = document.createElement("table");
  formNode.setAttribute('class', 'payments_balance_table');
  formNode.setAttribute('cellspacing', '0');
  formNode.innerHTML = formHtml;
  
  const selectWrap = formNode.querySelector(`#new-select-purpose-${index}`);
  const parentCategory = formNode.querySelector(`#new-parent-category-${index}`);
  const newNameAttribute = `form_payments_balance_collection[payments_balances_attributes][${index}][purpose_id]`;

  // 選択フォームを繰り返し表示
  const selectChildElement = (selectForm) => { 
    if (document.getElementById(selectForm) !== null) {
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

    childWrap.setAttribute('id', `new-child-select-wrap-${index}`);
    childWrap.setAttribute('class', 'ancestry_forms');

    childSelect.setAttribute('id', `new-child-select-${index}`);
    childSelect.setAttribute('class', 'form_ancestry');
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

    grandchildWrap.setAttribute('id', `new-grand-child-select-wrap-${index}`);
    grandchildWrap.setAttribute('class', 'ancestry_forms');

    grandchildSelect.setAttribute('id', `new-grand-child-select-${index}`)
    grandchildSelect.setAttribute('class', 'form_ancestry');
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

  return formNode;
}

function CanmaSeparated(inputAns){
  let inputAnsValue = inputAns.value;
  let numberAns = inputAnsValue.replace(/[^0-9]/g, "");
  CanmaAns = numberAns.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  if(CanmaAns.match(/[^0-9]/g)){
    inputAns.value= CanmaAns;
    return true;
  }
}

window.addEventListener("load", form_option);
