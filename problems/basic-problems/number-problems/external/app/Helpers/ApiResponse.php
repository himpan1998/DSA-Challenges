<?php

namespace App\Helpers;

class ApiResponse {
    /**
     * Success Response Set for Mobile Api Only
     * @param string
     * @param int
     * @param array
     * @param string
     * @return response
     */
    public function successResponseMobileApi($message = null, $code = 200, $data, $error = '', $type = false) {
        $responseArray['message'] = $message;
        $responseArray['data']    = $data['data'];
        if($type) {
            $responseArray['error']   = $error;
        }
        return response($responseArray, $code);
    }

    /**
     * Error Response Set for Mobile Api Only
     * @param string
     * @param int
     * @param array
     * @return response
     */
    public function errorResponseMobileApi($message = null, $code, $error, $type = true) {
        $responseArray['message'] = $message;
        $responseArray['data']    = (Object) [];
        if($type) {
            $responseArray['error']   = $error;
        }
        return response($responseArray, $code);
    }
}
