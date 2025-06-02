<?php

namespace App\Console\Commands;

use DB;
use Illuminate\Console\Command;

class DailyActiviyReportUpdate extends Command {
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'daily:daily_activity_report_update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update tbl_activity_reports table in power bi database';

    /**
     * Execute the console command.
     */
    public function handle() {
        $BI_DB_CONNECTION       = DB::connection('powerbi');
        $CRM_DB_CONNECTION      = DB::connection('crmdb');
        $localDatabaseData      = $BI_DB_CONNECTION->table('tbl_activity_reports')->orderBy('id', 'DESC')->first();
        $productionDatabaseData = $CRM_DB_CONNECTION->table('tbl_activity_reports')->where('id', '>', $localDatabaseData->id)->get();
       
        if ($productionDatabaseData->count() > 0) {
            $productionDatabaseData = json_decode(json_encode($productionDatabaseData), true);
            foreach($productionDatabaseData as $data) {
                $BI_DB_CONNECTION->table('tbl_activity_reports')->upsert($data, ['id']);
            }
            echo 'done';
        }
    }
}
