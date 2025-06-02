<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Traits\ApiResponseMessage;
use Auth;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Exception;

class AuthController extends Controller {
    use ApiResponseMessage;
    const EXPIRATION_TIME = 10; // minutes

    /**
     * authenticate user by laravel breeze authentication method
     * @param  \Illuminate\Http\Requests\Auth\LoginRequest  $request
     * @return response
     */
    public function authenticateUser(LoginRequest $request) {
        return $request->authenticate($request);
    }

    /**
     * destroy authenticated user  session by laravel breeze destroy method
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logOutAuthenticatedUser(Request $request) {
        $AuthenticatedSessionController = new AuthenticatedSessionController();
        return $AuthenticatedSessionController->destroy($request);
    }


    /**
     * get profile data for Angular State
     * @param Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function getUserAuthenticationState(Request $request) {
        try {
            $user        = Auth::user();
            // $has_2fa     = $user->token_2fa;
            // $require_otp = false;
            // if (in_array('super admin', Auth::user()->getRoleNames()->toArray())) {
            //     if ($has_2fa != null) {
            //         $require_otp = true;
            //     }
            // }

            // $USER_MENUS = $this->getMenuItems();
            // $ACCESS     = $this->getAreaAccess('', 0);
            // $ZONES      = json_encode($ACCESS['zones']);
            // $STATES     = json_encode($ACCESS['states']);
            // $DISTRICTS  = json_encode($ACCESS['districts']);
            $USER       = [
                'user_id'     => $user->id,
                //'user_name'   => $user->e_code,
                'name'        => $user->name,
                'email'       => $user->email ?? '',
                //'profile_id'  => $user->id,
                //'role'        => $user->roles[0]->name ?? '',
                'token'       => '',
                //'zones'       => $ZONES,
                //'states'      => $STATES,
                //'districts'   => $DISTRICTS,
                //'require_otp' => $require_otp,
                //'user_menus'  => json_encode($USER_MENUS['USER_MENU_ARRAY']),
                //'all_menus'   => json_encode($USER_MENUS['USER_PARENT_ITEMS']),
                //'products'    => json_encode(\Products::select('product_id', 'product_name')->orderBy('product_name', 'ASC')->get())
            ];

            $response      = $this->apiMessage(1);
            $responseArray = [
                'message' => $response[0],
                'data'    => $USER
            ];
            return response($responseArray, 200);
        } catch (Exception $error) {
            $response      = $this->apiMessage(9);
            $responseArray = [
                'message' => $response[0],
                'data'    => (Object) [],
                'error'   => $error->getMessage()
            ];
            return response($responseArray, $response[2]);
        }
    }

    /**
     * simple user login status check in server end
     * @return response
     */
    public function getLoginStatus(Request $request) {
        try {
            $user       = Auth::user();
            $isLoggedIn = false;
            if ($user) {
                $isLoggedIn = true;
            }

            $responseArray = [
                'message' => 'success',
                'data'    => [
                    'is_logged_in' => $isLoggedIn
                ],
                'error'   => ''
            ];

            return response($responseArray, 200);
        } catch (Exception $error) {
            $response      = $this->apiMessage(9);
            $responseArray = [
                'message' => $response[0],
                'data'    => (Object) [],
                'error'   => $error->getMessage()
            ];
            return response($responseArray, $response[2]);
        }
    }
}
