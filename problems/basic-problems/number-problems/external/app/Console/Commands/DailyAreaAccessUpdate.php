<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use DB;
use Illuminate\Console\Command;

class DailyAreaAccessUpdate extends Command {
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'daily:area_access_update';
    protected $accountAreaTableName = 'tbl_account_area_accesses';
    protected $userAreaTableName = 'tbl_user_area_access';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update/Insert data in tbl_subdealer_purchases table in power bi database';

    /**
     * Execute the console command.
     */
    public function handle() {
        $BI_DB_CONNECTION              = DB::connection('powerbi');
        $CRM_DB_CONNECTION             = DB::connection('crmdb');
        $localDatabaseData             = $BI_DB_CONNECTION->table($this->accountAreaTableName)->orderBy('account_area_id', 'DESC')->first();
        $queryDate                     = Carbon::now()->subDays(1)->format('Y-m-d');
        $productionDatabaseData        = $CRM_DB_CONNECTION->table($this->accountAreaTableName)->where('account_area_id', '>', $localDatabaseData->account_area_id)->get();
        $productionDatabaseUpdatedData = $CRM_DB_CONNECTION->table($this->accountAreaTableName)->whereDate('updated_at', $queryDate)->get();

        if ($productionDatabaseUpdatedData->count() > 0) {
            $productionDatabaseUpdatedData = json_decode(json_encode($productionDatabaseUpdatedData), true);
            foreach ($productionDatabaseUpdatedData as $data) {
                $BI_DB_CONNECTION->table($this->accountAreaTableName)->upsert($data, ['account_area_id']);
            }
        }

        if ($productionDatabaseData->count() > 0) {
            $productionDatabaseData = json_decode(json_encode($productionDatabaseData), true);
            foreach ($productionDatabaseData as $data) {
                $BI_DB_CONNECTION->table($this->accountAreaTableName)->upsert($data, ['account_area_id']);
            }
        }

        //user area access table update
        $localDatabaseData             = $BI_DB_CONNECTION->table($this->userAreaTableName)->orderBy('id', 'DESC')->first();
        $queryDate                     = Carbon::now()->subDays(1)->format('Y-m-d');
        $productionDatabaseData        = $CRM_DB_CONNECTION->table($this->userAreaTableName)->where('id', '>', $localDatabaseData->id)->get();
        $productionDatabaseUpdatedData = $CRM_DB_CONNECTION->table($this->userAreaTableName)->whereDate('updated_at', $queryDate)->get();

        if ($productionDatabaseUpdatedData->count() > 0) {
            $productionDatabaseUpdatedData = json_decode(json_encode($productionDatabaseUpdatedData), true);
            foreach ($productionDatabaseUpdatedData as $data) {
                $BI_DB_CONNECTION->table($this->userAreaTableName)->upsert($data, ['id']);
            }
        }

        if ($productionDatabaseData->count() > 0) {
            $productionDatabaseData = json_decode(json_encode($productionDatabaseData), true);
            foreach ($productionDatabaseData as $data) {
                $BI_DB_CONNECTION->table($this->userAreaTableName)->upsert($data, ['id']);
            }
        }
    }
}
