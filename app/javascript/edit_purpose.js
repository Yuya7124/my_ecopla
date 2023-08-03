function edit_purpose() {
  let formIndex = [];
  let forms = document.querySelectorAll(".balance_forms");
  let lastIndex = forms.length;

  let parentIds = [];
  let childIds = [];
  let grandchildIds = [];

  for (let i = 0; i < lastIndex - 1; i++) {
    formIndex.push(i);

    const selectWrap = document.getElementById(`edit-select-purpose-${formIndex[i]}`);
    const parentCategory = document.getElementById(`edit-parent-category-${formIndex[i]}`);
    const editNameAttribute = `payments_balance[payments_balances][${formIndex[i]}][purpose_id]`;

    //カテゴリーIDの取得
    switch (purpose_ids[i].length) {
      case 1:
        parentIds.push(purpose_ids[i][0]);
        childIds.push(null);
        grandchildIds.push(null);
        break;
      case 2:
        parentIds.push(purpose_ids[i][0]);
        childIds.push(purpose_ids[i][1]);
        grandchildIds.push(null);
        break;
      case 3:
        parentIds.push(purpose_ids[i][0]);
        childIds.push(purpose_ids[i][1]);
        grandchildIds.push(purpose_ids[i][2]);
        break;
    }

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
        const grandchildWrap = document.getElementById(`edit-grand-child-select-wrap-${formIndex[i]}`);
        if (grandchildWrap) {
          grandchildWrap.remove();
        }
        
        appendChildSelect(purposes);
        
        const childCategory = document.getElementById(`edit-child-select-${formIndex[i]}`);
        
        childCategory.addEventListener('change', () => {
          selectChildElement(`edit-grand-child-select-wrap-${formIndex[i]}`);
          getGrandchildCategoryData(childCategory);
        });
      }
    }
    
    //子カテゴリーのプルダウン
    const appendChildSelect = (purposes) => {
      const childWrap = document.createElement('td');
      const childSelect = document.createElement('select');

      childWrap.setAttribute('id', `edit-child-select-wrap-${formIndex[i]}`);
      childWrap.setAttribute('class', 'c_select_w');

      childSelect.setAttribute('id', `edit-child-select-${formIndex[i]}`);
      childSelect.setAttribute('class', 'c_select');
      childSelect.setAttribute('name', editNameAttribute);

      purposes.forEach(purpose => {
        const childOption = document.createElement('option');
        childOption.innerHTML = purpose.name;
        childOption.setAttribute('value', purpose.id);
        if (purpose.id == childIds[i]) {
          childOption.setAttribute('selected', 'selected');
        }
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

      const childWrap = document.getElementById(`edit-child-select-wrap-${formIndex[i]}`)
      const grandchildWrap = document.createElement('td')
      const grandchildSelect = document.createElement('select')

      grandchildWrap.setAttribute('id', `edit-grand-child-select-wrap-${formIndex[i]}`);
      grandchildWrap.setAttribute('class', 'c_select_w');


      grandchildSelect.setAttribute('id', `edit-grand-child-select-${formIndex[i]}`);
      grandchildSelect.setAttribute('class', 'c_select');
      grandchildSelect.setAttribute('name', editNameAttribute);
    
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
      selectChildElement(`edit-child-select-wrap-${formIndex[i]}`);
      getChildCategoryData();
    });
    
    const ExistingCategoryData = () => {
      const parentValue = parentCategory.value;
      categoryXHR(parentValue);

      XHR.onload = () => {
        const purposes = XHR.response.purpose;
        // 既存の孫カテゴリーのプルダウンを削除
        const grandchildWrap = document.getElementById(`edit-grand-child-select-wrap-${formIndex[i]}`);
        if (grandchildWrap) {
          grandchildWrap.remove();
        }
        
        appendChildSelect(purposes);
        
        const childCategory = document.getElementById(`edit-child-select-${formIndex[i]}`);
        
        selectChildElement(`edit-grand-child-select-wrap-${formIndex[i]}`);
        const ExistingGrandchildCategoryData = (grandchildCategory) => {
          const grandchildValue = grandchildCategory.value;
          categoryXHR(grandchildValue);
    
          XHR.onload = () => {
            const GrandChildItems = XHR.response.purpose;
            if (GrandChildItems.length != 0) {
              appendGrandChildSelect(GrandChildItems);
            }
          }
        }
        childCategory.addEventListener('change', () => {
          selectChildElement(`edit-grand-child-select-wrap-${formIndex[i]}`);
          getGrandchildCategoryData(childCategory);
        });
        ExistingGrandchildCategoryData(childCategory);
        //孫カテゴリーのプルダウン
        const appendGrandChildSelect = (purposes) => {
      
          const childWrap = document.getElementById(`edit-child-select-wrap-${formIndex[i]}`)
          const grandchildWrap = document.createElement('td')
          const grandchildSelect = document.createElement('select')
    
          grandchildWrap.setAttribute('id', `edit-grand-child-select-wrap-${formIndex[i]}`);
          grandchildWrap.setAttribute('class', 'c_select_w');
    
    
          grandchildSelect.setAttribute('id', `edit-grand-child-select-${formIndex[i]}`);
          grandchildSelect.setAttribute('class', 'c_select');
          grandchildSelect.setAttribute('name', editNameAttribute);
        
          purposes.forEach(purpose => {
            const grandchildOption = document.createElement('option');
            grandchildOption.innerHTML = purpose.name;
            grandchildOption.setAttribute('value', purpose.id);
            if (purpose.id == grandchildIds[i]) {
              grandchildOption.setAttribute('selected', 'selected');
            }
            grandchildSelect.appendChild(grandchildOption);
          });
          grandchildWrap.appendChild(grandchildSelect);
          childWrap.appendChild(grandchildWrap);
        }   
      }
    }
    ExistingCategoryData();
  }
}

window.addEventListener('load', edit_purpose); 