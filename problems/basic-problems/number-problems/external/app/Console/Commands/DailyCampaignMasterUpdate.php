<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use DB;
use Illuminate\Console\Command;

class DailyCampaignMasterUpdate extends Command {
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'daily:campaign_master_update';
    protected $tableName = 'tbl_campaign_masters';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update/Insert data in tbl_campaign_masters table in power bi database';

    /**
     * Execute the console command.
     */
    public function handle() {
        $BI_DB_CONNECTION              = DB::connection('powerbi');
        $CRM_DB_CONNECTION             = DB::connection('crmdb');
        $localDatabaseData             = $BI_DB_CONNECTION->table($this->tableName)->orderBy('campaign_id', 'DESC')->first();
        $queryDate                     = Carbon::now()->subDays(1)->format('Y-m-d');
        $productionDatabaseData        = $CRM_DB_CONNECTION->table($this->tableName)->where('campaign_id', '>', $localDatabaseData->campaign_id)->get();
        $productionDatabaseUpdatedData = $CRM_DB_CONNECTION->table($this->tableName)->whereDate('updated_at', $queryDate)->get();

        if ($productionDatabaseUpdatedData->count() > 0) {
            $productionDatabaseUpdatedData = json_decode(json_encode($productionDatabaseUpdatedData), true);
            foreach ($productionDatabaseUpdatedData as $data) {
                $BI_DB_CONNECTION->table($this->tableName)->upsert($data, ['campaign_id']);
            }
        }

        if ($productionDatabaseData->count() > 0) {
            $productionDatabaseData = json_decode(json_encode($productionDatabaseData), true);
            foreach ($productionDatabaseData as $data) {
                $BI_DB_CONNECTION->table($this->tableName)->upsert($data, ['campaign_id']);
            }
        }
    }
}
