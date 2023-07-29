function new_purpose() {
  const selectWrap = document.getElementById('new-select-purpose');
  const parentCategory = document.getElementById('new-parent-category');
  const newNameAttribute = 'form_payments_balance_collection[payments_balances_attributes][0][purpose_id]';

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
      const grandchildWrap = document.getElementById('new-grand-child-select-wrap');
      if (grandchildWrap) {
        grandchildWrap.remove();
      }
      
      appendChildSelect(purposes);
      
      const childCategory = document.getElementById('new-child-select');

      childCategory.addEventListener('change', () => {
        selectChildElement('new-grand-child-select-wrap');
        getGrandchildCategoryData(childCategory);
      });
    }
  }
  
  //子カテゴリーのプルダウン
  const appendChildSelect = (purposes) => {
    const childWrap = document.createElement('td');
    const childSelect = document.createElement('select');
    console.log(selectWrap)

    childWrap.setAttribute('id', 'new-child-select-wrap');
    childWrap.setAttribute('class', 'c_select_w');

    childSelect.setAttribute('id', 'new-child-select');
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

    const childWrap = document.getElementById('new-child-select-wrap')
    const grandchildWrap = document.createElement('td')
    const grandchildSelect = document.createElement('select')
    

    console.log(selectWrap)

    grandchildWrap.setAttribute('id', 'new-grand-child-select-wrap');
    grandchildWrap.setAttribute('class', 'c_select_w');

    grandchildSelect.setAttribute('id', 'new-grand-child-select')
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
 

  parentCategory.addEventListener('change', function () {
    selectChildElement('new-child-select-wrap');
    getChildCategoryData();
  });
}

window.addEventListener('load', new_purpose); 