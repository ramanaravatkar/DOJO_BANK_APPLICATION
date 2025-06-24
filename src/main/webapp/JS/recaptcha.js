document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    const response = grecaptcha.getResponse();
    if (response.length === 0) {
      e.preventDefault(); // stop form
      alert("Please complete the reCAPTCHA.");
    }
  });
});
