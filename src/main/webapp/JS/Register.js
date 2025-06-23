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
  "dijit/form/CheckBox",
  "dijit/Dialog",
  "dojo/domReady!"
], function(parser, dom, on, registry) {

  parser.parse().then(() => {
    const fields = [
      "FullName", "PhoneNumber", "email", "Password", "ConfirmPassword", "dob", "role", "addressArea"
    ];

    const registerBtn = registry.byId("RegisterBtn");
    const helpBtn = registry.byId("helpBtn");
    const helpDialog = registry.byId("helpDialog");
    const successDialog = registry.byId("successDialog");

    // Live password match validation
    const confirmPwdField = registry.byId("ConfirmPassword");
    on(confirmPwdField, "input", () => {
      const pwd = registry.byId("Password").get("value");
      const confirm = confirmPwdField.get("value");
      confirmPwdField.set("state", pwd === confirm ? "" : "Error");
    });

    on(registerBtn, "click", function () {
      // Final full form validation
      let isValid = true;

      fields.forEach(id => {
        const widget = registry.byId(id);
        if (widget && widget.validate) {
          if (!widget.validate()) {
            isValid = false;
          }
        }
      });

      const agreed = registry.byId("Iagree").get("checked");
      if (!agreed) {
        alert(" Please agree to the terms.");
        isValid = false;
      }

      const pwd = registry.byId("Password").get("value");
      const confirmPwd = registry.byId("ConfirmPassword").get("value");
      if (pwd !== confirmPwd) {
        confirmPwdField.set("state", "Error");
        isValid = false;
      }

      if (isValid) {
        successDialog.show();
        setTimeout(() => {
          successDialog.hide();
          window.location.href = "Login.html";
        }, 2000);
      }
    });

    on(helpBtn, "click", function () {
      helpDialog.show();
    });
  });
});
