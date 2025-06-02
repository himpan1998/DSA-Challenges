<?php

namespace App\Http\Controllers\V1\ExternalApi;

use App\Http\Controllers\Controller;
use App\Models\CrmModels\User;
use App\Models\Enquiry;
use Carbon\Carbon;
use Exception;
use GlobalApiResponse;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Guzzle\Http\Exception\ClientException;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ExternalApiController extends Controller {
    protected $CRM_URL;
    public function __construct() {
        $this->CRM_URL = env('CRM_PRODUCTION_URL') . 'externalapi/v1/';
    }

    public function getAccountDetails(Request $request) {
        $client = new Client();
        try {
            $validator = Validator::make($request->all(), [
                'sap_code' => 'required|integer'
            ]);

            if ($validator->fails()) {
                $HTTP_MESSAGE = config('apimessages.HTTP_BAD_REQUEST');
                return GlobalApiResponse::errorResponseMobileApi($HTTP_MESSAGE[0], $HTTP_MESSAGE[1], $validator->errors());
            } else {
                $sap_code = $request->sap_code;
                $request  = $client->get(env('CRM_PRODUCTION_URL') . 'externalapi/v1/get-account-details?sap_code=' . $sap_code);
                $response = $request->getBody();
                $response = json_decode($response);
                return $response;
            }
        } catch (ClientException $e) {
            $responseArray['message'] = 'internal server error';
            $responseArray['data']    = $e;
            return response($responseArray);
        } catch (\Exception $e) {
            $responseArray['message'] = 'internal server error  ';
            $responseArray['data']    = [];
            return response($responseArray, 500);
        }

    }

    /**
     * Common route send quried data to
     * in CRM application and update
     * database after successfull sync
     * @param \Illuminate\Http\Request $request
     */
    public function getEnquiriesForSync(Request $request) {
        if ($request->is_update && (int) $request->is_update === 1) {
            if ($request->id) {
                $id = explode(',', $request->id);
                if (count($id) > 0) {
                    Enquiry::whereIn('id', $id)->update(['is_synced' => 1]);
                }
                $data['data'] = $id;
                return response($data);
            }
        }
        $models       = Enquiry::where('is_synced', 0)->whereDate('created_at', date('Y-m-d', strtotime('-1 days')))->get();
        $data['data'] = $models;
        return response($data);
    }

    /**
     * Send request to CRM endpoint
     * to fetch employee attendance
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    final function fetchAttendance(Request $request) {
        $client      = new Client();
        $headers     = $request->header();
        $source      = $headers['source'][0] ?? '';
        $accessToken = $headers['access-token'][0] ?? '';
        $ContentType = $headers['Content-Type'][0] ?? '';
        try {
            $CONFIG = [
                'http_errors' => true,
                'headers'     => [
                    'Content-Type' => $ContentType,
                    'Accept'       => 'application/json',
                    'source'       => $source,
                    'access-token' => $accessToken
                ]
            ];

            $request  = $client->get($this->CRM_URL . 'hrms/attendance?sap_code=' . $request->sap_code . '&date=' . $request->date, $CONFIG);
            $response = $request->getBody();
            $response = json_decode($response, TRUE);
            return $response;
        } catch (RequestException $exception) {
            $errorContent = json_decode($exception->getResponse()->getBody()->getContents(), TRUE);
            $statusCode   = $exception->getResponse()->getStatusCode();
            return response($errorContent, $statusCode);
        }

    }

    /**
     * Send request to CRM database
     * to fetch employee attendance
     */
    final function fetchEmployeeAttendance(Request $request) {
        try {
            $validator = Validator::make($request->all(), [
                'sap_code' => ['required', 'gt:0'],
                'date'     => ['required', 'date', 'date_format:Y-m-d']
            ]);

            if ($validator->fails()) {
                return GlobalApiResponse::errorResponseMobileApi('bad request', 400, $validator->errors(), false);
            }

            $sapCode = $request->sap_code;
            $date    = $request->date;

            $model = User::select('id', 'name', 'emp_code')->where('emp_code', (int) $sapCode)
                ->with(['checkins' => function ($Q) use ($date) {
                    $Q->select('checkin_id', 'created_at', 'checkin_latitude', 'checkin_longitude', 'location', 'created_by');
                    $Q->whereIn('account_type', [18, 39, 40, 48, 65, 64, 70]);
                    $Q->whereIn('account_state', [0, 1]);
                    $Q->whereBetween('created_at', [Carbon::parse($date)->tz('Asia/Kolkata')->startOfDay(), Carbon::parse($date)->tz('Asia/Kolkata')->endOfDay()]);
                    $Q->orderBy('created_at', 'ASC');
                }])
                ->first();

            if ($request->raw) {
                $responseArray['data'] = $model;
                return GlobalApiResponse::successResponseMobileApi('Success', 200, $responseArray);
            }

            if (!$model) {
                $responseArray['data'] = [];
                return GlobalApiResponse::successResponseMobileApi('No data found', 200, $responseArray);
            }

            $timeSlot = [
                1 => [
                    'in'  => '08:30:00',
                    'out' => '10:30:59'
                ],
                2 => [
                    'in'  => '10:31:00',
                    'out' => '17:00:59'
                ],
                3 => [
                    'in'  => '17:01:00',
                    'out' => '20:30:59'
                ]
            ];

            $typeCodeIn  = 'P10';
            $typeCodeOut = 'P20';

            $firstSlotArray  = [];
            $secondSlotArray = [];
            $thirdSlotArray  = [];
            $responseMessage = 'No data found';

            if ($model->checkins->count() > 0) {
                $checkins     = $model->checkins;
                $firstSlotIn  = $checkins->whereBetween('created_at', [$date . ' ' . $timeSlot[1]['in'], $date . ' ' . $timeSlot[1]['out']]);
                $secondSlotIn = $checkins->whereBetween('created_at', [$date . ' ' . $timeSlot[2]['in'], $date . ' ' . $timeSlot[2]['out']]);
                $thirdSlotIn  = $checkins->whereBetween('created_at', [$date . ' ' . $timeSlot[3]['in'], $date . ' ' . $timeSlot[3]['out']]);

                if ($firstSlotIn->count() > 0) {
                    $inArray = [
                        'id'           => $firstSlotIn->first()->checkin_id . 'IN',
                        'terminalId'   => 1,
                        'assignmentId' => $model->emp_code,
                        'timeTypeCode' => 'TT1',
                        'timestamp'    => $firstSlotIn->sortBy('created_at')->first()->formatted_created_at,
                        'typeCode'     => $typeCodeIn
                    ];

                    $outArray = [
                        'id'           => $firstSlotIn->first()->checkin_id . 'OUT',
                        'terminalId'   => 1,
                        'assignmentId' => $model->emp_code,
                        'timeTypeCode' => 'TT1',
                        'timestamp'    => Carbon::parse($date . ' ' . $timeSlot[1]['out'])->tz('Asia/Kolkata')->format("Y-m-d\TH:i:sO"),
                        'typeCode'     => $typeCodeOut
                    ];

                    $firstSlotArray = [
                        [ ...$inArray], [ ...$outArray]
                    ];
                }

                if ($secondSlotIn->count() > 0) {
                    $inArray = [
                        'id'           => $secondSlotIn->first()->checkin_id . 'IN',
                        'terminalId'   => 1,
                        'assignmentId' => $model->emp_code,
                        'timeTypeCode' => 'TT1',
                        'timestamp'    => $secondSlotIn->sortBy('created_at')->first()->formatted_created_at,
                        'typeCode'     => $typeCodeIn
                    ];

                    $outArray = [
                        'id'           => $secondSlotIn->first()->checkin_id . 'OUT',
                        'terminalId'   => 1,
                        'assignmentId' => $model->emp_code,
                        'timeTypeCode' => 'TT1',
                        'timestamp'    => Carbon::parse($date . ' ' . $timeSlot[2]['out'])->tz('Asia/Kolkata')->format("Y-m-d\TH:i:sO"),
                        'typeCode'     => $typeCodeOut
                    ];

                    $secondSlotArray = [
                        [ ...$inArray], [ ...$outArray]
                    ];
                }

                if ($thirdSlotIn->count() > 0) {
                    $inArray = [
                        'id'           => $thirdSlotIn->first()->checkin_id . 'IN',
                        'terminalId'   => 1,
                        'assignmentId' => $model->emp_code,
                        'timeTypeCode' => 'TT1',
                        'timestamp'    => $thirdSlotIn->sortBy('created_at')->first()->formatted_created_at,
                        'typeCode'     => $typeCodeIn
                    ];

                    $outArray = [
                        'id'           => $thirdSlotIn->first()->checkin_id . 'OUT',
                        'terminalId'   => 1,
                        'assignmentId' => $model->emp_code,
                        'timeTypeCode' => 'TT1',
                        'timestamp'    => Carbon::parse($date . ' ' . $timeSlot[3]['out'])->tz('Asia/Kolkata')->format("Y-m-d\TH:i:sO"),
                        'typeCode'     => $typeCodeOut
                    ];

                    $thirdSlotArray = [
                        [ ...$inArray], [ ...$outArray]
                    ];
                }
                $responseMessage = 'Success';
            }

            $finalTimeSlotArray = [ ...$firstSlotArray, ...$secondSlotArray, ...$thirdSlotArray];

            $responseArray['data'] = $finalTimeSlotArray;
            return GlobalApiResponse::successResponseMobileApi($responseMessage, 200, $responseArray);

        } catch (Exception $error) {
            //return $error;
            return GlobalApiResponse::errorResponseMobileApi('Internal server error', 500, '');
        }
    }

    /**
     * GET account details & ledger
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    final function fetchAccount(Request $request) {
        try {
            $validator = Validator::make($request->all(), [
                'pan_no'     => ['nullable', 'required_if:type,=,pan_no', 'regex:/^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/'],
                'sap_code'   => ['nullable', 'required_if:type,=,sap_code', 'array'],
                'sap_code.*' => ['integer'],
                'date'       => ['nullable', 'required_if:type,=,sap_code', 'date', 'date_format:Y-m-d'],
                'type'       => ['required', 'string', Rule::in('sap_code', 'pan_no')]
            ]);

            if ($validator->fails()) {
                return GlobalApiResponse::errorResponseMobileApi('bad request', 401, $validator->errors());
            }

            $type        = $request->type;
            $queryString = "WITH SAP AS (
                SELECT account_id,account_type, sold_to, product_id, is_active
                FROM tbl_sap_masters WHERE deleted_at is NULL AND product_id in (1,2)
            ),
            DEALER AS (
                SELECT name as account_name, SAP.* FROM tbl_dealer_masters
                LEFT JOIN SAP ON SAP.account_id = dealer_id AND SAP.account_type = 39 WHERE pan_no='" . $request->pan_no . "'
            )

            SELECT * FROM DEALER";

            //echo $queryString;

            $dealerData      = collect(DB::connection('crmdb')->select($queryString));
            $dealerResponse  = (object) [];
            $responseMessage = 'success';
            $responseCode    = 204;

            if ($type != 'sap_code' && $dealerData->isNotEmpty()) {
                $dealerInfo       = $dealerData->first();
                $dealerSapCodes   = $dealerData->pluck('sold_to')->implode(',');
                $ledgerQuery      = "SELECT customer_id, productid_company, assign_no, particulars, remarks, doc_no, doc_type, debit_amount, credit_amount,post_date, created_at, profit_center, company_code FROM tbl_dealer_ledgers WHERE deleted_at is NULL AND customer_id IN (" . $dealerSapCodes . ")";
                $ledgerCollection = collect(DB::connection('crmdb')->select($ledgerQuery))->groupBy('customer_id');
                $accountData      = $dealerData->first();
                $dealerResponse   = [
                    'account_name' => $dealerInfo->account_name,
                    'account_id'   => $accountData->account_id,
                    'account_type' => $accountData->account_type,
                    'sap_codes'    => $dealerData->map(function ($item) {
                        return [
                            'sap_code'   => $item->sold_to,
                            'product_id' => $item->product_id,
                            'is_active'  => $item->is_active
                        ];
                    }),
                    'ledger'       => $ledgerCollection
                ];
                $responseMessage = 'success';
                $responseCode    = 200;
            }

            if ($type === 'sap_code') {
                $dealerSapCodes   = implode(',', $request->sap_code);
                $date             = $request->date;
                $ledgerQuery      = "SELECT customer_id, productid_company, assign_no, particulars, remarks, doc_no, doc_type, debit_amount, credit_amount,post_date, created_at, profit_center, company_code FROM tbl_dealer_ledgers WHERE deleted_at is NULL AND customer_id IN (" . $dealerSapCodes . ") AND DATE(created_at)= '" . $date . "' ";
                $ledgerCollection = collect(DB::connection('crmdb')->select($ledgerQuery))->groupBy('customer_id');
                $dealerResponse   = [
                    'ledger' => $ledgerCollection
                ];
                $responseMessage = 'success';
                $responseCode    = 200;
            }

            $responseArray['data'] = $dealerResponse;
            return GlobalApiResponse::successResponseMobileApi($responseMessage, $responseCode, $responseArray);

        } catch (Exception $error) {
            //return $error;
            return GlobalApiResponse::errorResponseMobileApi('Internal server error', 500, '');
        }
    }
}
