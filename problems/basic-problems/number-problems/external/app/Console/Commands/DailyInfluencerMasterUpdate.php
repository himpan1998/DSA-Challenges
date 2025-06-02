<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use DB;
use Illuminate\Console\Command;

class DailyInfluencerMasterUpdate extends Command {
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'daily:influencer_mason_master_update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update/Insert data in tbl_influencer_mason_masters in power bi database';

    /**
     * Execute the console command.
     */
    public function handle() {
        $BI_DB_CONNECTION              = DB::connection('powerbi');
        $CRM_DB_CONNECTION             = DB::connection('crmdb');
        $localDatabaseData             = $BI_DB_CONNECTION->table('tbl_influencer_mason_masters')->orderBy('account_id', 'DESC')->first();
        $queryDate                     = Carbon::now()->subDays(1)->format('Y-m-d');
        $productionDatabaseData        = $CRM_DB_CONNECTION->table('tbl_influencer_mason_masters')->where('account_id', '>', $localDatabaseData->account_id)->get();
        $productionDatabaseUpdatedData = $CRM_DB_CONNECTION->table('tbl_influencer_mason_masters')->whereDate('updated_at', $queryDate)->get();

        if ($productionDatabaseUpdatedData->count() > 0) {
            $productionDatabaseUpdatedData = json_decode(json_encode($productionDatabaseUpdatedData), true);
            foreach ($productionDatabaseUpdatedData as $data) {
                $BI_DB_CONNECTION->table('tbl_influencer_mason_masters')->upsert($data, ['account_id']);
            }
        }

        if ($productionDatabaseData->count() > 0) {
            $productionDatabaseData = json_decode(json_encode($productionDatabaseData), true);
            foreach ($productionDatabaseData as $data) {
                $BI_DB_CONNECTION->table('tbl_influencer_mason_masters')->upsert($data, ['account_id']);
            }
        }
    }
}
