function form_submit() {
  const submitButton = document.getElementById("save-button");
  const submitButtonDeactive = document.getElementById("save-button-deactive")
  const formInputs = document.querySelectorAll('.form_date, .form_purpose, .form_amount, .form_payment');
  let allInputsFilled = true;

  formInputs.forEach(input => {
    for (let i = 0; i < formInputs.length; i++) {
      if (formInputs.item(i).value === '') {
        allInputsFilled = false;
      }
    }
  
    if (allInputsFilled) {
      submitButton.style.display = "block";
      submitButtonDeactive.style.display = "none";
    } else {
      submitButton.style.display = "none";
      submitButtonDeactive.style.display = "block";
    }
    input.addEventListener('input', form_submit);
  });
}

window.addEventListener('load', form_submit); 