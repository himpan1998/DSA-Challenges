<?php
namespace App\Traits;

trait ApiResponseMessage {
    /*
    |-------------------
    | stores api response messages with response code
    | avaialble for using with web and api routes
    |-------------------
     */

    /**
     * @param int as index
     * @return array
     */
    public function apiMessage($index) {
        $responseCollectionArray = [
            1 => ['success', '', 200],
            2 => ['bad request', '', 400],
            3 => ['no data found', '', 204],
            4 => ['forbidden', '', 403],
            5 => ['duplicate data', '', 409],
            6 => ['data unmodified', '', 204],
            7 => ['permission denied', 'wrong credentials', 401],
            8 => ['record created', '', 201],
            9 => ['internl server error', '', 500],
        ];
        return $responseCollectionArray[$index];
    }
}
