<?php

namespace Database\Seeders;

use App\Models\Pipeline;
use App\Models\PipelineStatus;
use App\Models\PipelineStatusHook;
use App\Services\QuotationService;
use Illuminate\Database\Seeder;

class PipelineSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $salesPipeline = Pipeline::create(['name' => 'Sales']);

        $statusLead = PipelineStatus::create([
            'pipeline_id' => $salesPipeline->id,
            'name' => 'Lead',
            'order' => 1,
            'days_to_notify' => NULL,
            'can_win' => FALSE
        ]);

        $statusProspect = PipelineStatus::create([
            'pipeline_id' => $salesPipeline->id,
            'name' => 'Prospect',
            'order' => 2,
            'days_to_notify' => 15,
            'can_win' => FALSE
        ]);

        $statusQuotation = PipelineStatus::create([
            'pipeline_id' => $salesPipeline->id,
            'name' => 'Quotation',
            'order' => 3,
            'days_to_notify' => 5,
            'can_win' => FALSE
        ]);

        PipelineStatusHook::create([
            'pipeline_status_id' => $statusQuotation->id,
            'type' => PipelineStatusHook::TYPE_ON_ENTER,
            'hook' => QuotationService::class . '@createQuotationHook',
            'order' => 1
        ]);

        PipelineStatusHook::create([
            'pipeline_status_id' => $statusQuotation->id,
            'type' => PipelineStatusHook::TYPE_ON_EXIT,
            'hook' => QuotationService::class . '@verifyQuotationDoneHook',
            'order' => 1
        ]);

        $statusNegotiation = PipelineStatus::create([
            'pipeline_id' => $salesPipeline->id,
            'name' => 'Negotiation',
            'order' => 4,
            'days_to_notify' => 2,
            'can_win' => TRUE
        ]);
    }
}
