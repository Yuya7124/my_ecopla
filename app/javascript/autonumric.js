document.addEventListener("DOMContentLoaded", function () {
  const numericInputs = document.querySelectorAll('.autonumeric');
  numericInputs.forEach(input => {
    new AutoNumeric(input);
  });
});
