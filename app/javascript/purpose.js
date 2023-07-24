function purpose() {
  const parentCategory = document.getElementById('parent-category');
  const selectWrap = document.getElementById('select_purpose');

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
    const parentValue = parentCategory.value
    categoryXHR(parentValue);

    XHR.onload = () => {
      const purposes = XHR.response.purpose;
      console.log(purposes);
      appendChildSelect(purposes);
      
      const childCategory = document.getElementById('child-select')

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
    console.log(childWrap)
    console.log(childSelect)

    childWrap.setAttribute('id', 'child-select-wrap');
    childSelect.setAttribute('id', 'child-select');

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
    const grandchildValue = grandchildCategory.value
    categoryXHR(grandchildValue)

    XHR.onload = () => {
      const GrandChildItems = XHR.response.purpose;
      console.log(GrandChildItems.length)
      if (GrandChildItems.length != 0){
        appendGrandChildSelect(GrandChildItems)
      }
    }
  }

  //孫カテゴリーのプルダウン
  const appendGrandChildSelect = (purposes) => {

    const childWrap = document.getElementById('child-select-wrap')
    const grandchildWrap = document.createElement('td')
    const grandchildSelect = document.createElement('select')

    console.log(selectWrap)
    console.log(grandchildWrap)
    console.log(grandchildSelect)
 
    grandchildWrap.setAttribute('id', 'grand-child-select-wrap')
    grandchildSelect.setAttribute('id', 'grand-child-select')
 
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
  })
}

window.addEventListener('load', purpose); 