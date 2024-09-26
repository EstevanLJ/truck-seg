<?php

namespace App\Services;

use App\Exceptions\PipelineHookException;
use App\Models\Deal;
use App\Models\PipelineStatus;
use App\Models\Quotation;
use App\Models\QuotationDeal;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class QuotationService
{
    public static function createQuotationHook(Deal $deal, PipelineStatus $statusFrom, PipelineStatus $statusTo)
    {
        $quotationDeal = QuotationDeal::where('deal_id', '=', $deal->id)->first();

        if ($quotationDeal) {
            return true;
        }

        try {

            DB::beginTransaction();

            $quotation = Quotation::create([
                'client_id' => $deal->client_id,
                'quotation_type_id' => 1,
                'status' => Quotation::STATUS_WAITING,
                'name' => $deal->name,
                'observation' => null,
                'due_to' => $deal->limit_date,
                'assigned_to' => null,
                'created_by' => Auth::id()
            ]);

            $quotationDeal = QuotationDeal::create([
                'deal_id' => $deal->id,
                'quotation_id' => $quotation->id,
            ]);

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            throw $e;
        }


        return true;
    }

    public static function verifyQuotationDoneHook(Deal $deal, PipelineStatus $statusFrom, PipelineStatus $statusTo)
    {
        $quotationDeal = QuotationDeal::where('deal_id', '=', $deal->id)->first();

        if (!$quotationDeal) {
            throw new PipelineHookException('Cotação não encontrada');
        }

        if ($quotationDeal->quotation->status != Quotation::STATUS_DONE) {
            throw new PipelineHookException('Cotação não finalizada');
        }

        return true;
    }
}
