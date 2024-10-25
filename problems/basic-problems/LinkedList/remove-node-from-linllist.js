onFieldDataChanged: (e) => {
  let component = e.component;
  if (e.dataField === "state_id") {
    if (e.value) {
      let distributorEditor = component.getEditor("distributor_id");

      let distributorAccountFilterParams = {
        requested_account_type: "distributor",
        product_id: [1, 2, 3],
        parent_account_id: null,
        account_status: "5,7", //accountStatus,
        district_id: null,
        state_id: e.value,
      };

      let distributorData = dxAreaHelper.getAccount(
        distributorAccountFilterParams,
        true
      );
      distributorData.then((data) => {
        distributorEditor.option(
          "dataSource",
          new DevExpress.data.DataSource({
            store: data,
            paginate: true,
            pageSize: 10,
          })
        );
        distrubutorList = JSON.stringify(data);
      });
    }
  }

  if (e.dataField === "distributor_id") {
    let districtEditor = component.getEditor("district_id");

    districtEditor.reset();
    districtEditor.option("dataSource", []);
    if (e.value) {
      let distributorData = JSON.parse(distrubutorList);
      let selectedDistributor = distributorData.find(
        (obj) => obj.account_id == e.value
      );
      districtEditor.option(
        "dataSource",
        new DevExpress.data.DataSource({
          store: selectedDistributor.districts,
          paginate: true,
          pageSize: 10,
        })
      );
      var vals = selectedDistributor.districts.map(function (item) {
        return item.district_id;
      });
      districtEditor.option("value", vals);
    }
  }
};
