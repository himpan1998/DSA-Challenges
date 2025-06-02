<?php

namespace App\Http\Controllers\V1\Enquiry;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Enquiry;

class EnquiryController extends Controller {
    public function getEnquiry(Request $request) {
        $skip   = $request->skip ?? '';
        $take   = $request->take ?? '';
        $models = Enquiry::orderBy('created_at', 'DESC');
        if (isset($request['is_synced']) && $request['is_synced'] != 'null') {
            $models->where('is_synced', $request['is_synced']);
        }
        if (isset($request['from_date']) && !empty($request['from_date']) && isset($request['to_date']) && !empty($request['to_date'])) {
            $from = date($request['from_date']);
            $to   = date($request['to_date']);
            $models->whereBetween('created_at', [$from . " 00:00:00", $to . " 23:59:59"]);
        }

        $totalCount = $models->count();

        if (!empty($take)) {
            $models = $models->take($take)->skip($skip)->get();
        } else {
            $models = $models->get();
        }
        $data = [
            'totalCount' => $totalCount,
            'data'       => $models
        ];
        return response($data);
    }
}
