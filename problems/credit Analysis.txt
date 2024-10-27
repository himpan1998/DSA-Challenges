$(function () {
  // Form data to hold the Ship To and other details
  let formData = {
    shipTo: "",
    address: "",
    name: "",
    mobileNumber: "",
  };

  // Initialize DevExtreme form with Ship To field and Edit button
  $("#formContainer").dxForm({
    formData: formData,
    items: [
      {
        dataField: "shipTo",
        label: { text: "Ship To" },
        editorType: "dxTextBox",
        editorOptions: {
          onValueChanged: function (e) {
            const shipToCode = e.value;
            if (shipToCode.length === 6) {
              fetchAndPopulateData(shipToCode);
            } else {
              DevExpress.ui.notify(
                "Ship To code must be 6 digits.",
                "error",
                2000
              );
            }
          },
        },
        validationRules: [
          {
            type: "pattern",
            pattern: "^[0-9]{6}$",
            message: "Ship To code must be exactly 6 digits.",
          },
        ],
      },
      {
        template: function () {
          return $("<div>").dxButton({
            text: "Edit",
            onClick: function () {
              $("#editPopup").dxPopup("instance").show();
            },
          });
        },
      },
    ],
  });

  // Initialize DevExtreme Popup for the edit form
  $("#editPopup").dxPopup({
    title: "Edit Ship To Details",
    visible: false,
    width: 400,
    height: 400,
    contentTemplate: function () {
      return $("<div>").attr("id", "editFormContainer");
    },
    onShowing: function () {
      $("#editFormContainer").dxForm({
        formData: formData,
        items: [
          { dataField: "shipTo", label: { text: "Ship To" } },
          { dataField: "address", label: { text: "Address" } },
          { dataField: "name", label: { text: "Name" } },
          { dataField: "mobileNumber", label: { text: "Mobile Number" } },
        ],
      });
    },
    toolbarItems: [
      {
        widget: "dxButton",
        toolbar: "bottom",
        location: "after",
        options: {
          text: "Save",
          onClick: function () {
            // Save data from the popup form to the main form
            const popupFormData = $("#editFormContainer")
              .dxForm("instance")
              .option("formData");
            formData = { ...popupFormData };
            $("#formContainer").dxForm("instance").option("formData", formData);
            $("#editPopup").dxPopup("instance").hide();
          },
        },
      },
      {
        widget: "dxButton",
        toolbar: "bottom",
        location: "before",
        options: {
          text: "Cancel",
          onClick: function () {
            $("#editPopup").dxPopup("instance").hide();
          },
        },
      },
    ],
  });

  // Function to fetch and populate data based on Ship To code using axios
  function fetchAndPopulateData(shipToCode) {
    axios
      .get(`/api/getData/${shipToCode}`) // Replace with actual API endpoint
      .then((response) => {
        const data = response.data;
        if (data) {
          formData = {
            shipTo: data.shipTo || formData.shipTo,
            address: data.address || "",
            name: data.name || "",
            mobileNumber: data.mobileNumber || "",
          };
          $("#editFormContainer")
            .dxForm("instance")
            .option("formData", formData);
          $("#formContainer").dxForm("instance").option("formData", formData);
        } else {
          DevExpress.ui.notify(
            "No data found for the provided Ship To code",
            "error",
            2000
          );
        }
      })
      .catch((error) => {
        DevExpress.ui.notify("Error fetching data", "error", 2000);
        console.error("Error fetching data:", error);
      });
  }
});
