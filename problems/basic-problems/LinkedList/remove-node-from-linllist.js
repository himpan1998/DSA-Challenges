import {
  renderGridExportButton,
  renderSearchButton,
  renderFormResetButton,
} from "../../../../common/dx_button.js";

const APPROVAL_DATA_GRID = "orderApprovalDataGrid";
const APPROVAL_SEARCH_FORM = "orderApprovalSearchForm";
const SELECTED_REQUISITION_LOCAL_STORAGE_IDENTIFIER = "selectedRows";
const KEYEXPR = "id";
var orderActionBtn;
var formInstance;
const ORDER_STATUS = [
  {
    id: 0,
    name: "Approval Pending",
  },
  {
    id: 1,
    name: "Accepted",
  },
  {
    id: 2,
    name: "Rejected",
  },
  {
    id: 3,
    name: "Cleared for LP",
  },
  {
    id: 4,
    name: "Credit check Failed",
  },
  {
    id: 5,
    name: "Cleared for LP (Higher level)",
  },
  {
    id: 6,
    name: "Credit check Failed (Higher level)",
  },
];

function loadForm() {
  const formData = {};
  $(`#${APPROVAL_SEARCH_FORM}`)
    .dxForm({
      formData,
      showColonAfterLabel: false,
      // colCount:7,
      labelMode: "floating",
      onInitialized: function (e) {
        formInstance = e.component;
      },
      onContentReady: (e) => {
        let stateIdEditor = e.component.getEditor("state_id");
        stateIdEditor.option("value", 2);
      },
      onFieldDataChanged: (e) => {
        let component = e.component;
        if (e.dataField === "state_id") {
          let editor = component.getEditor("district_id");
          dxAreaHelper.getDistirct(e.value, editor);
        }
        if (e.dataField === "district_id") {
          let editor = component.getEditor("dealer_id");
          let accountFilterParams = {
            requested_account_type: 39,
            product_id: 1,
            parent_account_id: null,
            account_status: "5,7",
            district_id: e.value,
          };
          dxAreaHelper.getAccount(accountFilterParams, editor);
        }
      },
      items: [
        {
          itemType: "group",
          colCount: 5,
          items: [
            {
              dataField: "state_id",
              editorType: "dxSelectBox",
              editorOptions: {
                items: ACCESS_STATES,
                searchEnabled: true,
                showClearButton: true,
                displayExpr: "state_name",
                valueExpr: "state_id",
              },
              validationRules: [
                {
                  type: "required",
                  message: "State is required",
                },
              ],
              label: {
                text: "State",
              },
            },
            {
              dataField: "district_id",
              editorType: "dxSelectBox",
              editorOptions: {
                items: [],
                searchEnabled: true,
                showClearButton: true,
                displayExpr: "district_name",
                valueExpr: "district_id",
              },
              // validationRules: [
              //   // {
              //   //   type: 'required',
              //   //   message: 'District is required'
              //   // }
              // ],
              label: {
                text: "District",
              },
            },
            {
              colSpan: 1,
              dataField: "dealer_id",
              editorType: "dxSelectBox",
              editorOptions: {
                // width:200,
                items: [],
                searchEnabled: true,
                valueExpr: "account_id",
                displayExpr: (item) => {
                  if (item) {
                    return `${item.name} (${item.sap_code})`;
                  }
                },
                showClearButton: true,
              },
              validationRules: [],
              label: {
                text: "Dealer",
              },
            },
            {
              dataField: "status",
              editorType: "dxSelectBox",
              editorOptions: {
                items: ORDER_STATUS,
                searchEnabled: true,
                valueExpr: "id",
                displayExpr: (item) => {
                  if (item) {
                    return `${item.name}`;
                  }
                },
                showClearButton: true,
              },
              validationRules: [],
              label: {
                text: "Order status",
              },
            },
            // {
            //   dataField: 'loaded',
            //   editorType: 'dxSelectBox',
            //   editorOptions: {
            //     items: [
            //       {
            //         id: 1,
            //         name: 'Pending'
            //       },
            //       {
            //         id: 2,
            //         name: 'Submitted'
            //       }
            //     ],
            //     searchEnabled: true,
            //     valueExpr: 'id',
            //     displayExpr: (item) => {
            //       if (item) {
            //         return `${item.name}`;
            //       }
            //     },
            //     showClearButton: true
            //   },
            //   validationRules: [],
            //   label: {
            //     text: 'LP status'
            //   }
            // },
            // {
            //   colSpan: 1,
            //   dataField: 'requisition_date',
            //   editorType: 'dxDateBox',
            //   width: 240,
            //   editorOptions: {
            //     width: 240,
            //     type: 'date',
            //     pickerType: 'calendar',
            //     formatString: 'd/M/y',
            //     displayFormat: 'd/M/y',
            //     value: null,
            //     inputAttr: { 'aria-label': 'Disabled' }
            //   },
            //   validationRules: [],
            //   label: {
            //     text: 'Order date'
            //   }
            // },
            {
              dataField: "requisition_date",
              editorType: "dxDateRangeBox",
              useMaskBehavior: false,
              dateSerializationFormat: "dd-MM-yyyy",
              invalidDateMessage:
                "The date must have the following format: dd-MM-yyyy",
              editorOptions: {
                min: new Date().setMonth(new Date().getMonth() - 6),
                max: new Date().setMonth(new Date().getMonth() + 6),
                startDateLabel: "Order Start Date",
                startDatePlaceholder: "Order Start Date",
                endDateLabel: "Order End Date",
                endDatePlaceholder: "Order End Date",
                displayFormat: "dd-MM-yyyy",
              },
              validationRules: [],
            },
            {
              cssClass: "text-right",
              colSpan: 5,
              template: (data, itemElement) => {
                let searchButton = renderSearchButton(
                  "orderApprovalSearchForm",
                  loadOrders,
                  itemElement
                );
                let resetButton = renderFormResetButton(
                  "resetButton",
                  $(`#orderApprovalSearchForm`).dxForm("instance"),
                  APPROVAL_DATA_GRID
                );
                let exportButton = renderGridExportButton({
                  id: "exportButton",
                  grid_id: "#orderApprovalDataGrid",
                  file_name: "requisition_history.xlsx",
                  can_export: CAN_EXPORT,
                  has_custom_action: false,
                  sheet_name: "requisition_history",
                  export_hidden_columns: false,
                });

                itemElement.append([searchButton, resetButton, exportButton]);
              },
            },
          ],
        },
      ],
    })
    .dxForm("instance");
}

function loadOrders(payload = {}, loadType = false, buttonComponent) {
  var dataSource = new DevExpress.data.CustomStore({
    key: KEYEXPR,
    load: function (loadOptions) {
      var deferred = $.Deferred(),
        args = {};
      [].forEach(function (i) {
        if (i in loadOptions && this.isNotEmpty(loadOptions[i]))
          args[i] = JSON.stringify(loadOptions[i]);
      });
      if (payload?.requisition_date) {
        payload.requisition_date = moment(payload.requisition_date).format(
          "YYYY-MM-DD"
        );
      }
      if (payload.loaded == 1) {
        $(`#${APPROVAL_DATA_GRID}`)
          .dxDataGrid("instance")
          .option("selection", { mode: "multiple" });
      }

      $.ajax({
        url: route("webapi.order.ho.order_list"),
        method: "GET",
        dataType: "json",
        data: payload,
        success(result) {
          deferred.resolve(result.data, {
            totalCount: result.totalCount,
          });
          changeButtonStateAndText(buttonComponent, false);
        },
        error: function () {
          deferred.reject("Data Loading Error");
          changeButtonStateAndText(buttonComponent, false);
        },
      });
      return deferred.promise();
    },
    remove: (key) => {
      var store = $(`#${APPROVAL_DATA_GRID}`)
        .dxDataGrid("instance")
        .getDataSource()
        .store();
      store.push([{ type: "remove", key: key }]);
    },
  });

  $(() => {
    $(`#${APPROVAL_DATA_GRID}`).dxDataGrid({
      dataSource,
      KEYEXPR,
      remoteOperations: true,
      columnHidingEnabled: false,
      showBorders: true,
      showRowLines: true,
      allowColumnReordering: false,
      allowColumnResizing: false,
      columnAutoWidth: true,
      showBorders: true,
      hoverStateEnabled: true,
      wordWrapEnabled: true,
      rowAlternationEnabled: true,
      allowSort: false,
      paging: {
        enabled: true,
        pageSize: 100,
      },
      sorting: {
        mode: "none",
      },

      scrolling: {
        showScrollbar: "always",
        scrollByContent: true,
      },
      selection: {
        mode: "multiple",
      },
      ...LOAD_PANEL_DX,
      onToolbarPreparing: (e) => {
        e.toolbarOptions.items.unshift({
          location: "before",
          template() {
            return $("<div>")
              .addClass("text-info text-bold")
              .append(
                $("<span>").text(
                  "For approving orders you have to select first by clicking the checkbox below."
                )
              );
          },
        });
        e.toolbarOptions.items.unshift({
          location: "after",
          widget: "dxDropDownButton",
          options: {
            stylingMode: "contained",
            text: "Actions",
            disabled: true,
            visible: CAN_APPROVE,
            type: "default",
            items: ["Accepted", "Reject"],
            onInitialized(e) {
              orderActionBtn = e.component;
            },
            elementAttr: {
              class: "btn btn-success",
              id: "approve-orders",
            },
            onItemClick(e) {
              const action = e.itemData;
              if (action === "Accepted") {
                let params = {
                  html: 'Do you wish to <span class="text-success font-weight-bold">approve</span> selected request?',
                  title: "Confirm Approve",
                  action: "APPROVE",
                };
                renderApprovalConfirmationPopup(params, e, dataSource);
              } else {
                let params = {
                  html: 'Do you wish to <span class="text-danger font-weight-bold">reject</span> selected request?',
                  title: "Confirm Reject",
                  action: "REJECT",
                };
                renderApprovalConfirmationPopup(params, e, dataSource);
              }
            },
          },
        });
      },
      onEditorPreparing(e) {
        if (e.parentType === "dataRow" && e.command == "select") {
          if (e.row.data.status !== 0) {
            e.editorOptions.disabled = true;
            e.editorOptions.readOnly = true;
            e.editorOptions.onValueChanged = function (ev) {
              e.component.deselectRows([e.row.key]);
            };
          }
        }
      },
      columns: [
        {
          dataField: "order_code",
          caption: "Order ID",
          fixed: false,
          cellTemplate: (container, options) => {
            let id = options.data.id;
            // let status = options.data.status;
            // status=1  Approved status:0 Not Approved Lp
            const routeURL = route("web.order.edit_primary", {
              id: btoa(id),
            });
            let span = $(
              `<a class="text-info dx-link" target='_blank'> ${options?.data?.order_code}</a>`
            ).attr("href", routeURL);
            container.append(span);
          },
        },
        {
          dataField: "order_date",
          fixed: false,
          caption: "Order date",
          width: 150,
          visible: true,
        },
        {
          dataField: "order_status_name",
          caption: "Order status",
          width: 130,
          alignment: "left",
          cellTemplate: (container, options) => {
            const status = options?.data?.status;

            const statusBlock = makeStatusLabel(status, "order");
            container.append(statusBlock);
          },
        },
        // {
        //   dataField: 'loading_program.batch_id',
        //   caption: 'Loading ID',
        //   alignment: 'left',
        //   cellTemplate: (container, options) => {
        //     const loading_program = options?.data?.loading_program;
        //     const batch_id = loading_program?.batch_id ? `${loading_program.batch_id}` : null;
        //     let span = '-';
        //     if (batch_id !== null) {
        //       const routeURL = route('web.order.loading_program_history', {
        //         batch_id: btoa(batch_id)
        //       });
        //       span = $(`<a class="text-info dx-link" target='_blank'>${batch_id}</a>`).attr('href', routeURL);
        //     }

        //     container.append(span);
        //   }
        // },
        // {
        //   dataField: 'vehicle_status_value',
        //   caption: 'Vehicle status',
        //   alignment: 'left',
        //   cellTemplate: (container, options) => {
        //     const statusName = options?.data?.vehicle_status ? 'Added' : 'Not Added';
        //     const type = statusName === 'Added' ? 'success' : 'warning';
        //     const statusBlock = makeCustomStatusLabel(statusName, type);
        //     container.append(statusBlock);
        //   }
        // },
        {
          dataField: "dealer_name",
          caption: "Dealer name",
          allowEditing: false,
        },
        {
          dataField: "source",
          caption: "Source",
          visible: false,
        },
        {
          dataField: "order_qty",
          caption: "Order qty (MT)",
        },
        {
          dataField: "approved_qty",
          caption: "Approved Qty (MT)",
        },
        {
          dataField: "utilized_qty",
          caption: "Utilized Qty (MT)",
        },
      ],
      onInitialized: () => {
        localStorage.removeItem(SELECTED_REQUISITION_LOCAL_STORAGE_IDENTIFIER);
      },
      onSelectionChanged(selectedItems) {
        const data = selectedItems.selectedRowsData;
        if (data.length > 0) {
          let filteredId = data.map((data) => {
            return data.id;
          });

          $("#approvalId").val(filteredId.toString());

          orderActionBtn.option("disabled", !data.length);
          return false;
        }

        orderActionBtn.option("disabled", !data.length);
      },
    });
  });

  /**
   * Render confirmation popup before
   * submit on action
   * @param {*} params
   */
  function renderApprovalConfirmationPopup(params, e, dataSource) {
    var formInstance;
    return $("#popup")
      .dxPopup({
        contentTemplate: function (contentElement) {
          contentElement.append(
            $("<h5 />")
              .addClass("text-black font-weight-normal text-center")
              .html(params.html),
            $("<div/>")
              .addClass("text-center")
              .append(
                $("<div />")
                  .addClass("m-1")
                  .attr("id", "buttonContainer")
                  .dxButton({
                    text: "Yes",
                    stylingMode: "contained",
                    text: "Yes",
                    type: "success",
                    width: "25%",
                    elementAttr: {
                      class: "btn btn-success",
                    },
                    onClick: (e) => {
                      if (params.action === "REJECT") {
                        var rejectionPopup = $("#popup")
                          .dxPopup({
                            contentTemplate: (contentElement) => {
                              var formContainer = $(
                                '<form id="form-remark-submit">'
                              );
                              formContainer
                                .dxForm({
                                  formData: {},
                                  labelMode: "hidden",
                                  onInitialized: function (e) {
                                    formInstance = e.component;
                                  },
                                  items: [
                                    {
                                      dataField: "ho_remarks",
                                      editorType: "dxTextArea",
                                      editorOptions: {
                                        height: 90,
                                        maxLength: 300,
                                        placeholder: "HO rejection remarks",
                                      },
                                      validationRules: [
                                        {
                                          type: "required",
                                          message:
                                            "Please enter rejection remark",
                                        },
                                        {
                                          type: "stringLength",
                                          min: 5,
                                          message:
                                            "The remark must be between 5 to 300 characters",
                                        },
                                      ],
                                    },
                                    {
                                      itemType: "button",
                                      horizontalAlignment: "right",
                                      useSubmitBehavior: true,
                                      buttonOptions: {
                                        text: "Submit",
                                        type: "success",
                                        onClick: function (e) {
                                          let formData =
                                            formInstance.option("formData");
                                          var result =
                                            formInstance &&
                                            formInstance.validate();
                                          if (result && result.isValid) {
                                            toastr.info(
                                              "Submitting rejected request. Please do not close of refresh this window."
                                            );
                                            submitApprovalFormData({
                                              form_data: {
                                                id: $("#approvalId").val(),
                                                ho_remarks: formData.ho_remarks,
                                              },
                                              type: "reject",
                                              popup_instance: rejectionPopup,
                                              source: dataSource,
                                            });
                                          }
                                        },
                                      },
                                    },
                                  ],
                                })
                                .dxForm("instance");
                              contentElement.append(formContainer);
                            },
                            wrapperAttr: {
                              id: "devexpress_popup",
                            },
                            width: 400,
                            height: "auto",
                            shading: true,
                            container: "#gridContainer",
                            showTitle: true,
                            title: "Rejection Remark",
                            visible: false,
                            dragEnabled: false,
                            hideOnOutsideClick: false,
                            showCloseButton: true,
                            deferRendering: false,
                            position: {
                              my: "center",
                              collision: "fit",
                            },
                          })
                          .dxPopup("instance");
                        rejectionPopup.show();
                      }

                      if (params.action === "APPROVE") {
                        toastr.info(
                          "Submitting approved request. Please do not close of refresh this window."
                        );
                        submitApprovalFormData({
                          form_data: {
                            id: $("#approvalId").val(),
                            ho_remarks: null,
                          },
                          type: "approve",
                          popup_instance: this,
                          source: dataSource,
                        });
                      }
                    },
                  }),
                $("<div />")
                  .addClass("m-1")
                  .attr("id", "buttonContainer")
                  .dxButton({
                    text: "No",
                    stylingMode: "contained",
                    text: "No",
                    type: "danger",
                    width: "25%",
                    elementAttr: {
                      class: "btn btn-danger",
                    },
                    onClick: (e) => {
                      this.hide();
                    },
                  })
              )
          );
        },
        wrapperAttr: {
          id: "devexpress_popup",
        },
        width: 400,
        height: 200,
        shading: true,
        container: "#gridContainer",
        showTitle: true,
        title: params.title,
        visible: false,
        dragEnabled: false,
        hideOnOutsideClick: false,
        showCloseButton: true,
        position: {
          my: "center",
          collision: "fit",
        },
      })
      .dxPopup("instance")
      .show();
  }
}

/**
 * Submit approval or rejection form
 * @param {*} params
 */
function submitApprovalFormData(params) {
  $(LOADER_DIV).toggleClass("d-none");
  var payload = {
    id: params?.form_data?.id,
    type: params?.type,
    remarks: params?.form_data?.ho_remarks,
  };

  let URL = route("webapi.order.ho.update_status");
  axios
    .post(URL, { ...payload })
    .then((response) => {
      var result = response.data;
      toastr.success(result.message);
      let gridInstance = $("#orderApprovalDataGrid").dxDataGrid("instance");
      params.popup_instance.hide();
      gridInstance.refresh();
      $(LOADER_DIV).toggleClass("d-none");
    })
    .catch((error) => {
      $(LOADER_DIV).toggleClass("d-none");
    });
}

/**
 * Initial Load
 */
loadForm();
loadOrders();
