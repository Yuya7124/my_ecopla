function new_purpose() {
  let formIndex = [];
  let forms = document.querySelectorAll(".balance_forms");
  let lastIndex = forms.length;
  const formInputs = document.querySelectorAll('.form_date, .form_purpose, .form_amount, .form_payment');
  const submitButton = document.getElementById("save-button");
  let allInputsFilled = true;
  
  for (let i = 0; i < lastIndex - 1; i++) {
    formIndex.push(i);
    
    const selectWrap = document.getElementById(`new-select-purpose-${formIndex[i]}`);
    const parentCategory = document.getElementById(`new-parent-category-${formIndex[i]}`);
    const newNameAttribute = `form_payments_balance_collection[payments_balances_attributes][${formIndex[i]}][purpose_id]`;
   
    // 選択フォームを繰り返し表示
    const selectChildElement = (selectForm) => { 
      if (document.getElementById(selectForm) !== null) {
        document.getElementById(selectForm).remove();
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
        const grandchildWrap = document.getElementById(`new-grand-child-select-wrap-${formIndex[i]}`);
        if (grandchildWrap) {
          grandchildWrap.remove();
        }
        
        appendChildSelect(purposes);
        
        const childCategory = document.getElementById(`new-child-select-${formIndex[i]}`);

        childCategory.addEventListener('change', () => {
          selectChildElement(`new-grand-child-select-wrap-${formIndex[i]}`);
          getGrandchildCategoryData(childCategory);
        });
      }
    }
    
    //子カテゴリーのプルダウン
    const appendChildSelect = (purposes) => {
      const childWrap = document.createElement('td');
      const childSelect = document.createElement('select');

      childWrap.setAttribute('id', `new-child-select-wrap-${formIndex[i]}`);
      childWrap.setAttribute('class', 'ancestry_forms');

      childSelect.setAttribute('id', `new-child-select-${formIndex[i]}`);
      childSelect.setAttribute('class', 'form_purpose');
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

      const childWrap = document.getElementById(`new-child-select-wrap-${formIndex[i]}`)
      const grandchildWrap = document.createElement('td')
      const grandchildSelect = document.createElement('select')

      grandchildWrap.setAttribute('id', `new-grand-child-select-wrap-${formIndex[i]}`);
      grandchildWrap.setAttribute('class', 'ancestry_forms');

      grandchildSelect.setAttribute('id', `new-grand-child-select-${formIndex[i]}`)
      grandchildSelect.setAttribute('class', 'form_purpose');
      grandchildSelect.setAttribute('name', newNameAttribute);
  
      purposes.forEach(purpose => {
        const grandchildOption = document.createElement('option');
        grandchildOption.innerHTML = purpose.name;
        grandchildOption.setAttribute('value', purpose.id);
        grandchildSelect.appendChild(grandchildOption);
      });
  
      grandchildWrap.appendChild(grandchildSelect);
      childWrap.appendChild(grandchildWrap);
    }
  
    parentCategory.addEventListener('change', function () {
      selectChildElement(`new-child-select-wrap-${formIndex[i]}`);
      getChildCategoryData();
    });
  }
}

window.addEventListener('load', new_purpose); 