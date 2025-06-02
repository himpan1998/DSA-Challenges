<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class ApiResponseFacade extends Facade {
    /**
     * @return string
     */
    protected static function getFacadeAccessor() {
        return 'apiresponse';
    }
}
