<?php
namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('daily:users_update')->cron('00 01 * * 1-7')->runInBackground();
        $schedule->command('daily:daily_activity_report_update')->cron('00 02 * * 1-7')->runInBackground();
        $schedule->command('daily:distributor_master_update')->cron('00 02 * * 1-7')->runInBackground();
        $schedule->command('daily:dealer_master_update')->cron('15 02 * * 1-7')->runInBackground();
        $schedule->command('daily:subdealer_master_update')->cron('20 02 * * 1-7')->runInBackground();
        $schedule->command('daily:sap_master_data_update')->cron('25 02 * * 1-7')->runInBackground();
        $schedule->command('daily:subdealer_purchase_update')->cron('30 02 * * 1-7')->runInBackground();
        $schedule->command('daily:engineer_master_update')->cron('40 02 * * 1-7')->runInBackground();
        $schedule->command('daily:mason_master_update')->cron('45 02 * * 1-7')->runInBackground();
        $schedule->command('daily:fabricator_master_update')->cron('50 02 * * 1-7')->runInBackground();
        $schedule->command('daily:pettycontractor_master_update')->cron('55 02 * * 1-7')->runInBackground();
        $schedule->command('daily:account_address_update')->cron('00 03 * * 1-7')->runInBackground();
        $schedule->command('daily:area_access_update')->cron('10 03 * * 1-7')->runInBackground();
        $schedule->command('daily:lead_master_update')->cron('20 03 * * 1-7')->runInBackground();
        $schedule->command('daily:account_employee_tags_update')->cron('30 03 * * 1-7')->runInBackground();
        $schedule->command('daily:campaign_master_update')->cron('40 03 * * 1-7')->runInBackground();
        $schedule->command('daily:campaign_invite_lists_update')->cron('45 03 * * 1-7')->runInBackground();
        $schedule->command('daily:campaign_requested_by_accounts_update')->cron('50 03 * * 1-7')->runInBackground();
        $schedule->command('daily:ihb_project_master_update')->cron('00 04 * * 1-7')->runInBackground();
        $schedule->command('daily:outdoor_branding_master_update')->cron('30 04 * * 1-7')->runInBackground();
        $schedule->command('daily:outdoor_branding_images_update')->cron('40 04 * * 1-7')->runInBackground();
        $schedule->command('daily:outdoor_branding_logs_update')->cron('45 04 * * 1-7')->runInBackground();
        $schedule->command('daily:sturdflex_secondary_sale_update')->cron('50 04 * * 1-7')->runInBackground();
        $schedule->command('daily:branding_requisition_master_update')->cron('55 04 * * 1-7')->runInBackground();
        $schedule->command('daily:influencer_mason_master_update')->cron('00 05 * * 1-7')->runInBackground();
        $schedule->command('daily:influencer_mason_lifting_update')->cron('20 05 * * 1-7')->runInBackground();

        $schedule->command('daily:primary_loading_program_items_update')->cron('20 05 * * 1-7')->runInBackground();
        $schedule->command('daily:primary_loading_program_orders_update')->cron('20 05 * * 1-7')->runInBackground();
        $schedule->command('daily:primary_order_loading_programs_update')->cron('20 05 * * 1-7')->runInBackground();
        $schedule->command('daily:primary_order_masters_update')->cron('20 05 * * 1-7')->runInBackground();
        $schedule->command('daily:primary_order_product_mappings_update')->cron('20 05 * * 1-7')->runInBackground();
        $schedule->command('daily:product_category_masters_update')->cron('20 05 * * 1-7')->runInBackground();
        $schedule->command('daily:product_sku_masters_update')->cron('20 05 * * 1-7')->runInBackground();
        $schedule->command('daily:primary_order_over_due_clearing_plans_update')->cron('20 05 * * 1-7')->runInBackground();
        $schedule->command('daily:dealer_ledgers_update')->cron('20 05 * * 1-7')->runInBackground();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');
        require base_path('routes/console.php');
    }
}
