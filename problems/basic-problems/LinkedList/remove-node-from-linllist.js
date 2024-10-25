public function getOrderList(Request $request) {
  try {
      $dealer_id         = $request->dealer_id ?? 0;
      $status            = $request->status ?? 0;
      $requisition_date  = $request->requisition_date ?? [];
      $startDate         = Carbon::parse($request->requisition_date[0])->format('Y-m-d');
      $endDate           = Carbon::parse($request->requisition_date[1])->format('Y-m-d');
      $area_access_array = AccessControl::getAreaAccess('id');
      $states            = $area_access_array['states'];
      $districts         = $area_access_array['districts'];
      $state_id          = $request->state_id ? (array) $request->state_id : 0;
      $district_id       = $request->district_id ? (array) $request->district_id : 0;
      // $requisition_date  = $request->requisition_date ?? null;
      $source_id = $request->source_id ?? 1;
      $loaded    = $request->loaded ?? NULL;
      $user_role = Auth::user()->getRoleNames()[0];

      if (count($requisition_date) > 0) {
          $startDate = Carbon::parse($requisition_date[0])->format('Y-m-d');
          $endDate   = Carbon::parse($requisition_date[1])->format('Y-m-d');
      } else {
          // Handle the case where requisition_date is not set or has less than 2 elements
          $startDate = null;
          $endDate   = null;
      }
      $models = PrimaryOrderMaster::query();
      if (count($request->requisition_date ?? []) > 0) {
          $startDate = Carbon::parse($request->requisition_date[0])->format('Y-m-d');
          $endDate   = Carbon::parse($request->requisition_date[1])->format('Y-m-d');
          $models    = $models->whereBetween('created_at', [$startDate, $endDate]);
      }

      $orders = PrimaryOrderMaster::
          when($state_id > 0, function ($Q) use ($state_id) {
          $Q->where('state_id', $state_id);
      })->
          when($district_id > 0, function ($Q) use ($district_id) {
          $Q->where('district_id', $district_id);
      })
          ->when($user_role !== 'super admin', function ($Q) use ($states, $districts) {
              $Q->whereIn('district_id', $districts);

          })->
          when($dealer_id > 0, function ($Q) use ($dealer_id) {
          $Q->where('account_id', $dealer_id);
      })
          ->where('status_id', $status)
      //  ->
      // when(!is_null($status), function ($Q) use ($status) {
      //     $Q->where('status_id', $status);
      //     if ($status == 0) {
      //         $Q->whereHas('loading_program');
      //     }
      // })->when($loaded !== NULL, function ($Q) use ($loaded) {
      //     if ($loaded == 2) {
      //         $Q->whereHas('loading_program');
      //     } else {
      //         $Q->whereDoesntHave('loading_program');
      //     }
      // })
          ->
      with('dealer:dealer_id,name,sap_code',
          'state:state_id,state_name', 'district:district_id,district_name', 'loading_program')
          ->with('dealer.mapped_subdealers')->with('dealer.mapped_subdealers.address')
          ->with(['products' => function ($Q) {
              $Q->with('product');
          }])->orderBy('id', 'desc')->get();

      $totalCount  = count($orders);
      $ordersArray = [];

      foreach ($orders as $row) {

          $isVehicleDetailsAdded = 0;
          if (!is_null($row->loading_program)) {
              $registratioNo         = $row->loading_program->registration_no;
              $driverContactNo       = $row->loading_program->driver_contact_number;
              $driverName            = $row->loading_program->driver_name;
              $isVehicleDetailsAdded = ($registratioNo !== null && $driverContactNo !== null && $driverName !== null) ? 1 : 0;
          }

          $ordersArray[] = [
              'id'                   => $row->id,
              'order_code'           => $row->order_code,
              'order_date'           => date('d-m-Y', strtotime($row->created_at)),
              'dealer_name'          => $row->dealer->name . '(' . $row->dealer->sap_code . ')',
              'subdealers'           => $row->dealer->mapped_subdealers,
              'sap_code'             => $row->dealer->sap_code,
              'order_qty'            => $row->quantity_by_dealer,
              'approved_qty'         => $row->final_quantity,
              'utilized_qty'         => $row->utilized_quantity,
              'status'               => $row->status_id,
              'source'               => 'self',
              'loaded'               => !is_null($row->loading_program) ? 1 : 0,
              'ordered_skus'         => $row->products,
              'loading_program'      => $row->loading_program,
              'vehicle_status'       => $isVehicleDetailsAdded,
              'vehicle_status_value' => $isVehicleDetailsAdded === 1 ? 'Added' : 'Not Added',
              'order_status'         => $row->status_id,
              'order_status_name'    => $this->STATUSES->where('id', $row->status_id)->pluck('name')
          ];
      }
      return GlobalApiResponse::successResponse($this->HTTP_SUCCESS_MESSAGE[0], $this->HTTP_SUCCESS_MESSAGE[1], ['data' => $ordersArray, 'totalCount' => $totalCount], '');

  } catch (\Exception $error) {
      return GlobalApiResponse::errorResponse($this->HTTP_ERROR_MESSAGE[0], 500, $error->getMessage());
  }
}