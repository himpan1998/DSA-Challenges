<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\V1\Enquiry\EnquiryController;
use App\Http\Controllers\V1\ExternalApi\ExternalApiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return view('index');
});

Route::group(['prefix' => 'webapi'], function () {
    Route::group(['prefix' => 'v1'], function () {
        Route::prefix('user')->group(function () {
            Route::controller(AuthController::class)->group(function () {
                Route::post('login', 'authenticateUser');
                Route::middleware(['auth'])->group(function () {
                    Route::post('logout', 'logOutAuthenticatedUser');
                    Route::get('auth-state', 'getUserAuthenticationState');
                    Route::get('login-status', 'getLoginStatus');
                });

            });
        });

        Route::controller(EnquiryController::class)->middleware(['auth'])->prefix('enquiry')->group(function () {
            Route::get('list', 'getEnquiry');
        });

        Route::controller(ExternalApiController::class)->prefix('enquiry')->group(function () {
            Route::get('sync', 'getEnquiriesForSync');
        });
    });
});
