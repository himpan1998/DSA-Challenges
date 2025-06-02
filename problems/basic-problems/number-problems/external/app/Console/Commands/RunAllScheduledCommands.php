<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;

class RunAllScheduledCommands extends Command
{
    protected $signature   = 'schedule:run-all';
    protected $description = 'Run all scheduled commands immediately';

    public function handle()
    {
        $this->call('daily:users_update');
        $this->call('daily:daily_activity_report_update');
        $this->call('daily:distributor_master_update');
        $this->call('daily:dealer_master_update');
        $this->call('daily:subdealer_master_update');
        $this->call('daily:sap_master_data_update');
        $this->call('daily:subdealer_purchase_update');
        $this->call('daily:engineer_master_update');
        $this->call('daily:mason_master_update');
        $this->call('daily:fabricator_master_update');
        $this->call('daily:pettycontractor_master_update');
        $this->call('daily:account_address_update');
        $this->call('daily:area_access_update');
        $this->call('daily:lead_master_update');
        $this->call('daily:account_employee_tags_update');
        $this->call('daily:campaign_master_update');
        $this->call('daily:campaign_invite_lists_update');
        $this->call('daily:campaign_requested_by_accounts_update');
        $this->call('daily:ihb_project_master_update');
        $this->call('daily:outdoor_branding_master_update');
        $this->call('daily:outdoor_branding_images_update');
        $this->call('daily:outdoor_branding_logs_update');
        $this->call('daily:sturdflex_secondary_sale_update');
        $this->call('daily:branding_requisition_master_update');
        $this->call('daily:influencer_mason_master_update');
        $this->call('daily:influencer_mason_lifting_update');

        //new
        $this->call('daily:primary_loading_program_items_update');
        $this->call('daily:primary_loading_program_orders_update');
        $this->call('daily:primary_order_loading_programs_update');
        $this->call('daily:primary_order_masters_update');
        $this->call('daily:primary_order_product_mappings_update');
        $this->call('daily:product_category_masters_update');
        $this->call('daily:product_sku_masters_update');
        $this->call('daily:primary_order_over_due_clearing_plans_update');
        $this->call('daily:dealer_ledgers_update');

        $this->info('All scheduled commands have been executed.');
    }
}
