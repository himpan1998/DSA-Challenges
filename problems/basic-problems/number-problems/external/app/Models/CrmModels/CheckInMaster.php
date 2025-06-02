<?php

namespace App\Models\CrmModels;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckInMaster extends Model {
    use HasFactory;

    protected $connection = 'crmdb';
    protected $table      = 'tbl_checkin_masters';
    protected $appends    = ['formatted_created_at'];

    public function getCreatedAtAttribute($value) {
        return Carbon::parse($value)->tz('Asia/Kolkata')->format('Y-m-d H:i:s'); //->format("Y-m-d\TH:i:sO");
    }

    public function getFormattedCreatedAtAttribute($value) {
        return Carbon::parse($this->created_at)->format("Y-m-d\TH:i:sO");
    }
}
