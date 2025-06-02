<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use DB;
use Illuminate\Console\Command;

class DailyDistrictMasterUpdate extends Command {
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'daily:district_masters_update';
    protected $tableName = 'tbl_district_masters';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update/Insert data in tbl_district_masters table in power bi database';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle() {
        $BI_DB_CONNECTION              = DB::connection('powerbi');
        $CRM_DB_CONNECTION             = DB::connection('crmdb');
        $localDatabaseData             = $BI_DB_CONNECTION->table($this->tableName)->orderBy('district_id', 'DESC')->first();
        $queryDate                     = Carbon::now()->subDays(1)->format('Y-m-d');
        $productionDatabaseData        = $CRM_DB_CONNECTION->table($this->tableName)->where('district_id', '>', $localDatabaseData->district_id)->get();
        $productionDatabaseUpdatedData = $CRM_DB_CONNECTION->table($this->tableName)->whereDate('updated_at', $queryDate)->get();

        if ($productionDatabaseUpdatedData->count() > 0) {
            $productionDatabaseUpdatedData = json_decode(json_encode($productionDatabaseUpdatedData), true);
            foreach ($productionDatabaseUpdatedData as $data) {
                $BI_DB_CONNECTION->table($this->tableName)->upsert($data, ['district_id']);
            }
        }

        if ($productionDatabaseData->count() > 0) {
            $productionDatabaseData = json_decode(json_encode($productionDatabaseData), true);
            foreach ($productionDatabaseData as $data) {
                $BI_DB_CONNECTION->table($this->tableName)->upsert($data, ['district_id']);
            }
        }
    }
}
