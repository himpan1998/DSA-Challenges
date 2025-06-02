<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Enquiry extends Model {
    use HasFactory;
    protected function isSynced(): Attribute {
        return Attribute::make(
            get:fn(string $value) => $value == 1 ? 'SYNCED' : 'NON-SYNCED',
        );
    }

    protected function createdAt(): Attribute {
        return Attribute::make(
            get:fn(string $value) => date('d-m-Y h:i A', strtotime($value)),
        );
    }
}
