require([
  "dojo/parser",
  "dojo/dom",
  "dojo/on",
  "dijit/registry",
  "dijit/form/Button",
  "dijit/form/ValidationTextBox",
  "dijit/form/TextBox",
  "dijit/form/DateTextBox",
  "dijit/form/ComboBox",
  "dijit/Dialog",
  "dojo/domReady!"
], function(parser, dom, on, registry) {

  parser.parse().then(() => {

    const registerBtn = registry.byId("RegisterBtn");
    const helpBtn = registry.byId("helpBtn");
    const helpDialog = registry.byId("helpDialog");
    const successDialog = registry.byId("successDialog");

    const confirmPwdField = registry.byId("ConfirmPassword");

    // Real-time password confirmation validation
    on(confirmPwdField, "input", function () {
      const pwd = registry.byId("Password").get("value");
      const confirm = confirmPwdField.get("value");
      confirmPwdField.set("state", pwd === confirm ? "" : "Error");
    });

    on(registerBtn, "click", function () {
      let allValid = true;

      // Validate all relevant fields
      const fieldIds = [
        "FullName", "PhoneNumber", "email",
        "Password", "ConfirmPassword", "dob", "role"
      ];

      fieldIds.forEach(id => {
        const widget = registry.byId(id);
        if (widget && widget.validate) {
          if (!widget.validate()) {
            allValid = false;
          }
        }
      });

      // Confirm passwords match
      const pwd = registry.byId("Password").get("value");
      const confirmPwd = registry.byId("ConfirmPassword").get("value");
      if (pwd !== confirmPwd) {
        confirmPwdField.set("state", "Error");
        allValid = false;
      }

      // Check reCAPTCHA
    //  const response = grecaptcha.getResponse();
   //   if (response.length === 0) {
     //   alert("⚠️ Please verify reCAPTCHA.");
     //   allValid = false;
   //   }

      if (!allValid) {
        alert("⚠️ Please fix the errors in the form.");
        return;
      }

      // If everything is valid, show success dialog
      successDialog.show();
      setTimeout(() => {
        successDialog.hide();
        document.querySelector("form").submit(); // submit to "Register" servlet
      }, 2000);
    });

    // Help button
    on(helpBtn, "click", function () {
      helpDialog.show();
    });
  });
});
