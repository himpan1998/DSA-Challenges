<?php

namespace App\Providers;

use App\Helpers\ApiResponse;
use Illuminate\Support\ServiceProvider;

class ApiResponseProvider extends ServiceProvider {
    /**
     * Register services.
     *
     * @return void
     */
    public function register() {
        $this->app->bind('apiresponse', function($app) {
            return new ApiResponse();
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot() {
        //
    }
}
