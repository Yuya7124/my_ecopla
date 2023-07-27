function purpose() {
  const parentCategory = document.getElementById('parent-category');
  const selectWrap = document.getElementById('select_purpose');
  const newNameAttribute = 'form_payments_balance_collection[payments_balances_attributes][0][purpose_id]';

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
      console.log(purposes);
      appendChildSelect(purposes);
      
      const childCategory = document.getElementById('child-select');

      childCategory.addEventListener('change', () => {
        selectChildElement('grand-child-select-wrap');
        getGrandchildCategoryData(childCategory);
      });
    }
  }
  
  //子カテゴリーのプルダウン
  const appendChildSelect = (purposes) => {
    const childWrap = document.createElement('td');
    const childSelect = document.createElement('select');
    console.log(selectWrap)

    childWrap.setAttribute('id', 'child-select-wrap');
    childWrap.setAttribute('class', 'c_select_w');

    childSelect.setAttribute('id', 'child-select');
    childSelect.setAttribute('class', 'c_select');
    childSelect.setAttribute('name', newNameAttribute);

    const editNameBase = 'payments_balance[payments_balances]';

    let forms = document.querySelectorAll('.balance_forms');
    for (let index = 0; index < forms.length - 2; index++) {
      const form = forms[index];
      
      const editNameAttribute = `${editNameBase}[${index}][purpose_id]`;
      const ChildSelectQuery = form.querySelector('.c_select');
      ChildSelectQuery.setAttribute('name', editNameAttribute);
    }

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

    const childWrap = document.getElementById('child-select-wrap')
    const grandchildWrap = document.createElement('td')
    const grandchildSelect = document.createElement('select')
    

    console.log(selectWrap)

    grandchildWrap.setAttribute('id', 'child-select-wrap');
    grandchildWrap.setAttribute('class', 'c_select_w');

    grandchildSelect.setAttribute('id', 'child-select');
    grandchildSelect.setAttribute('class', 'c_select');
    grandchildSelect.setAttribute('name', newNameAttribute);

    const editNameBase = 'payments_balance[payments_balances]';

    const forms = document.querySelectorAll('.balance_forms');
    for (let index = 0; index < forms.length; index++) {
      const form = forms[index];
      const editNameAttribute = `${editNameBase}[${index}][purpose_id]`;
      const grandchildSelectQuery = form.querySelector('.c_select');
      grandchildSelectQuery.setAttribute('name', editNameAttribute);
    }
 
     purposes.forEach(purpose => {
      const grandchildOption = document.createElement('option');
      grandchildOption.innerHTML = purpose.name;
      grandchildOption.setAttribute('value', purpose.id);
      grandchildSelect.appendChild(grandchildOption);
    });
 
    grandchildWrap.appendChild(grandchildSelect)
    childWrap.appendChild(grandchildWrap)
  }
 

  parentCategory.addEventListener('change', function () {
    selectChildElement('child-select-wrap');
    getChildCategoryData();
  });

  // カテゴリー選択済みの場合、子・孫カテゴリーフォームを表示
  const selectedValue = parentCategory.value;
  console.log(selectedValue)
  if (selectedValue !== '') {
    getChildCategoryData();
  }
}

window.addEventListener('load', purpose); 