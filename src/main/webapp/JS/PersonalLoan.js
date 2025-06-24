require([
  "dijit/layout/TabContainer",
  "dijit/layout/ContentPane",
  "dijit/form/TextBox",
  "dijit/form/Button",
  "dojo/dom",
  "dojo/dom-construct",
  "dojo/parser",
  "dojo/domReady!"
], function(TabContainer, ContentPane, TextBox, Button, dom, domConstruct, parser) {

  // Create the TabContainer
  var tabContainer = new TabContainer({
    style: "height: 100%; width: 100%;"
  }, "loanTabs");

  // ------------------ Page 1: Full Name ------------------
  var page1 = new ContentPane({
    title: "Step 1: Full Name"
  });

  var nameInput = new TextBox({
    name: "fullName",
    placeholder: "Enter your full name",
    style: "margin: 10px;"
  });

  domConstruct.place("<label style='margin:10px;'>Full Name:</label>", page1.containerNode);
  page1.containerNode.appendChild(nameInput.domNode);

  // ------------------ Page 2: Upload Aadhaar ------------------
  var page2 = new ContentPane({
    title: "Step 2: Aadhaar Upload"
  });

  var fileLabel = document.createElement("label");
  fileLabel.innerHTML = "Upload Aadhaar Card:";
  fileLabel.style.margin = "10px";

  var fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".jpg,.jpeg,.png,.pdf";
  fileInput.style.margin = "10px";

  page2.containerNode.appendChild(fileLabel);
  page2.containerNode.appendChild(document.createElement("br"));
  page2.containerNode.appendChild(fileInput);

  // ------------------ Page 3: Review ------------------
  var page3 = new ContentPane({
    title: "Step 3: Review & Submit"
  });

  var reviewBtn = new Button({
    label: "Submit Application",
    style: "margin: 20px;",
    onClick: function() {
      alert("Application submitted successfully!");
    }
  });

  page3.containerNode.innerHTML = "<p style='margin: 10px;'>Please review your details before submitting.</p>";
  page3.containerNode.appendChild(reviewBtn.domNode);

  // Add all pages to tab container
  tabContainer.addChild(page1);
  tabContainer.addChild(page2);
  tabContainer.addChild(page3);

  // Start the container
  tabContainer.startup();
});
