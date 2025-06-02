<?php

namespace App\Models\CrmModels;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Model {
    use HasFactory;
    
    protected $connection = 'crmdb';
    
    
    public function checkins(): HasMany {
        return $this->hasMany(CheckInMaster::class, 'created_by', 'id');
    }
}
