function form_submit() {
  const submitButton = document.getElementById("save-button");
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
    } else {
      submitButton.style.display = "none";
    }
    input.addEventListener('input', form_submit);
  });
}

window.addEventListener('load', form_submit); 