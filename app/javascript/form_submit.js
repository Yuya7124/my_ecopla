function form_submit() {
  const NewsubmitButton = document.getElementById("save-button");
  const NewsubmitButtonDeactive = document.getElementById("save-button-deactive");
  const UpdatesubmitButton = document.getElementById("update-button");
  const UpdatesubmitButtonDeactive = document.getElementById("update-button-deactive");
  const formInputs = document.querySelectorAll('.form_date, .form_purpose, .form_amount, .form_payment');
  let allInputsFilled = true;

  formInputs.forEach(input => {
    for (let i = 0; i < formInputs.length; i++) {
      if (formInputs.item(i).value === '') {
        allInputsFilled = false;
      }
    }
  
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
    input.addEventListener('input', form_submit);
  });
}

window.addEventListener('load', form_submit); 