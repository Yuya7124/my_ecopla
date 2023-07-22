function purpose() {
  const parentCategory = document.getElementById('parent-category')
  const selectWrap = document.getElementById('select-wrap')
  const selectChildElement = (selectForm) => {
  }

  const XHR = new XMLHttpRequest();
  
  const categoryXHR = (id) => {
    XHR.open("GET", `/purpose/${id}`, true);
    XHR.responseType = "json";
    XHR.send();
  }
  
  const getChildCategoryData = () => {
    const parentValue = parentCategory.value
    categoryXHR(parentValue)

    XHR.onload = () => {
      const purposes = XHR.response.purpose;
      console.log(purposes)
      appendChildSelect(purposes)
      
      const childCategory = document.getElementById('child-select')

      childCategory.addEventListener('change', () => {
        selectChildElement('grand-child-select-wrap')
        getGrandchildCategoryData(childCategory)
      })
    }
  }

  const appendChildSelect = (purposes) => {

    const childWrap = document.createElement('td')
    const childSelect = document.createElement('select')
    console.log(childSelect)

    childWrap.setAttribute('id', 'child-select-wrap')
    childSelect.setAttribute('id', 'child-select')

    purposes.forEach(purpose => {
      const childOption = document.createElement('option')
      childOption.innerHTML = purpose.name
      childOption.setAttribute('value', purpose.id)
      childSelect.appendChild(childOption)
    });

    childWrap.appendChild(childSelect)
    selectWrap.appendChild(childWrap)
  }

  parentCategory.addEventListener('change', function () {
    selectChildElement('child-select-wrap')
    getChildCategoryData()
  })
}

window.addEventListener('load', purpose); 