<?php

use App\Http\Controllers\V1\ExternalApi\ExternalApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware(['auth:api'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::controller(ExternalApiController::class)->group(function () {
        Route::get('get-account-details', 'getAccountDetails');
        Route::post('partner-details', 'fetchAccount');
        Route::prefix('hrms')->group(function() {
            Route::get('attendance', 'fetchAttendance');
        });
        Route::prefix('employee')->group(function() {
            Route::post('attendance', 'fetchEmployeeAttendance');
        });
    });
});