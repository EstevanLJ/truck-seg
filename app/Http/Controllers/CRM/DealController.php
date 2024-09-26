<?php

namespace App\Http\Controllers\CRM;

use App\Exceptions\PipelineHookException;
use App\Http\Controllers\Controller;
use App\Models\Deal;
use App\Models\DealHistory;
use App\Models\DealStatusChange;
use App\Models\Person;
use App\Models\PipelineStatus;
use App\Models\PipelineStatusHook;
use App\Services\PersonService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class DealController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (!Laratrust::isAbleTo('deals-read')) {
            abort(401);
        }

        $deals = Deal::orderBy('name')
            ->with('client', 'owner', 'pipeline_status')
            ->orderBy('limit_date', 'asc');

        if (!$request->has('all')) {
            $deals->where('owner_id', '=', Auth::id());
            $deals->where('finished_status', '=', Deal::FINISHED_STATUS_OPEN);
        } else {
        }

        $deals = $deals->get();

        return [
            'data' => $deals
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!Laratrust::isAbleTo('deals-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'value' => 'nullable|numeric',
            'probability' => 'nullable|numeric',
            'observation' => 'nullable|string',
            'insurance_type' => 'required|integer',
            'new_insurance' => 'required|boolean',
            'old_insurance_company_id' => 'nullable|required_if:new_insurance,0|integer|exists:insurance_company,id',
            'limit_date' => 'nullable|required_if:new_insurance,0|date',

            'client.id' => 'nullable|integer',
            'client.type' => 'required|integer',
            'client.name' => 'required|string',
            'client.document' => 'required|string',
            'client.trading_name' => 'nullable|string',
            'client.contact_name' => 'nullable|string',
            'client.email' => 'nullable|email',
            'client.phone' => 'nullable|string',
            'client.main_activity' => 'nullable|string',
            'client.main_activity_code' => 'nullable|string',
            'client.share_capital' => 'nullable|numeric',
            'client.juridic_nature' => 'nullable|string',
            'client.antt_register' => 'nullable|string',
            'client.corporate' => 'nullable|boolean',
            'client.creation_date' => 'nullable|date',

            'client.addresses.*.description' => 'required|string',
            'client.addresses.*.main' => 'required|boolean',
            'client.addresses.*.address' => 'required|string',
            'client.addresses.*.number' => 'required|string',
            'client.addresses.*.complement' => 'nullable|string',
            'client.addresses.*.district' => 'required|string',
            'client.addresses.*.city' => 'required|string',
            'client.addresses.*.state' => 'required|string',
            'client.addresses.*.zip_code' => 'required|string',

            'client.employees.*.name' => 'required|string',
            'client.employees.*.role' => 'required|string',

            'client.activities.*.code' => 'required|string',
            'client.activities.*.description' => 'required|string',
        ]);

        if ($validated['new_insurance']) {
            $validated['limit_date'] = null;
            $validated['old_insurance_company_id'] = null;
        }

        try {

            DB::beginTransaction();

            $person = PersonService::store($validated['client']);

            $deal = Deal::create([
                'name' => $validated['name'],
                'insurance_type' => intval($validated['insurance_type']),
                'new_insurance' => $validated['new_insurance'],
                'value' => $validated['value'] ?? NULL,
                'probability' => $validated['probability'] ?? NULL,
                'observation' => $validated['observation'] ?? NULL,
                'limit_date' => $validated['limit_date'] ?? NULL,
                'old_insurance_company_id' => $validated['old_insurance_company_id'] ?? NULL,
                'client_id' => $person->id,
                'owner_id' => Auth::id(),
                'pipeline_id' => 1,
                'pipeline_status_id' => 1,
                'finished_status' => Deal::FINISHED_STATUS_OPEN
            ]);

            DealHistory::create([
                'deal_id' => $deal->id,
                'user_id' => Auth::id(),
                'event_type' => DealHistory::CREATION,
                'description' => 'Negociação criada'
            ]);

            DealStatusChange::create([
                'deal_id' => $deal->id,
                'user_id' => Auth::id(),
                'start' => Carbon::now(),
                'pipeline_status_id' => $deal->pipeline_status_id,
            ]);

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }

        return [
            'data' => $deal
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Deal  $deal
     * @return \Illuminate\Http\Response
     */
    public function show(Deal $deal)
    {
        if (!Laratrust::isAbleTo('deals-read')) {
            abort(401);
        }

        $deal->load(
            'client',
            'owner',
            'pipeline_status',
            'pipeline',
            'histories',
            'statusChanges',
            'activities.assignedTo',
            'activities.doneBy',
            'activities.type',
            'documents.user',
            'quotationDeal'
        );

        $statuses = [];
        foreach ($deal->pipeline->statuses as $pipelineStatus) {
            $statusChange = $deal->statusChanges->where('pipeline_status_id', $pipelineStatus->id)->first();

            $status = [
                'id' => $pipelineStatus->id,
                'name' => $pipelineStatus->name,
                'order' => $pipelineStatus->order,
                'done' => !!$statusChange
            ];

            if ($statusChange) {
                $status['start'] = $statusChange->start;
            } else {
                if ($pipelineStatus->order < $deal->pipeline_status->order) {
                    $statusChange = $deal->statusChanges->where('order', '<', $pipelineStatus->order)->first();
                    $status['start'] = $statusChange->start;
                    $status['done'] = true;
                } else {
                    $status['start'] = null;
                }
            }

            $statuses[] = $status;
        }

        foreach ($statuses as $index => $status) {
            if ($status['id'] === $deal->pipeline_status_id) {
                $statuses[$index]['diff'] = Carbon::parse($statuses[$index]['start'])->diffInDays(Carbon::now());
                continue;
            }

            if (!$statuses[$index]['start'] || !isset($statuses[$index + 1]) || !$statuses[$index + 1]['start']) {
                continue;
            }

            $statuses[$index]['diff'] = Carbon::parse($statuses[$index]['start'])->diffInDays($statuses[$index + 1]['start']);
        }

        return [
            'data' => $deal,
            'statuses' => $statuses
        ];
    }

    /**
     * Change the finished status of the deal
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Deal  $deal
     * @return \Illuminate\Http\Response
     */
    public function changeFinishedStatus(Request $request, Deal $deal)
    {
        if (!Laratrust::isAbleTo('deals-update')) {
            abort(401);
        }

        $currentStatus = $deal->pipeline_status;

        if (!$currentStatus->can_win) {
            return response()->json([
                'status' => 'error',
                'message' => 'Negociação não pode ser vencida nesse status'
            ], 500);
        }

        $validated = $request->validate([
            'finished_status' => 'required|integer|in:' . Deal::FINISHED_STATUS_ARRAY,
            'finished_date' => 'nullable|date',
            'finished_value' => 'nullable|numeric',
            'insurance_company_id' => 'required_if:finished_status,1|nullable|integer|exists:insurance_company,id',
            'deal_lost_reason_id' => 'required_if:finished_status,2|nullable|integer|exists:deal_lost_reason,id',
            'finished_observation' => 'nullable|string',
        ]);

        $sameStatus = $validated['finished_status'] === $deal->finished_status;

        try {

            DB::beginTransaction();

            $deal->update($validated);

            if (!$sameStatus) {
                $eventType = DealHistory::OPEN;
                $description = 'A negociação foi reaberta';
                if ($deal->finished_status == Deal::FINISHED_STATUS_WON) {
                    $eventType = DealHistory::WON;
                    $description = 'A negociação foi vencida';
                }
                if ($deal->finished_status == Deal::FINISHED_STATUS_LOST) {
                    $eventType = DealHistory::LOST;
                    $description = 'A negociação foi perdida';
                }

                DealHistory::create([
                    'deal_id' => $deal->id,
                    'user_id' => Auth::id(),
                    'event_type' => $eventType,
                    'description' => $description
                ]);
            }

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }

        return [
            'data' => $deal
        ];
    }

    /**
     * Change the status of the deal
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Deal  $deal
     * @return \Illuminate\Http\Response
     */
    public function changeStatus(Request $request, Deal $deal)
    {
        if (!Laratrust::isAbleTo('deals-update')) {
            abort(401);
        }

        if ($deal->finished_status !== Deal::FINISHED_STATUS_OPEN) {
            return response()->json([
                'error' => 'The deal must be open to change the status'
            ], 500);
        }

        $newStatus = PipelineStatus::findOrFail($request->input('new_status_id'));

        if ($newStatus->id === $deal->pipeline_status_id) {
            return response()->json([
                'error' => 'The deal is already on status ' . $newStatus->name
            ], 500);
        }

        //Hooks
        try {
            $this->processHooks($deal, $deal->pipeline_status, $newStatus);
        } catch (PipelineHookException $phe) {
            return response()->json([
                'status' => 'error',
                'message' => $phe->getMessage()
            ], 500);
        } catch (Exception $e) {
            report($e);
            abort(500);
        }

        try {

            DB::beginTransaction();

            $changeHistories = DealStatusChange::where('deal_id', '=', $deal->id)
                ->orderBy('id', 'desc')
                ->get();

            foreach ($changeHistories as $changeHistory) {
                if ($changeHistory->pipeline_status->order >= $newStatus->order) {
                    $changeHistory->delete();
                }
            }

            DealHistory::create([
                'deal_id' => $deal->id,
                'user_id' => Auth::id(),
                'event_type' => DealHistory::STATUS_CHANGE,
                'description' => 'Status changed to ' . $newStatus->name
            ]);

            DealStatusChange::create([
                'deal_id' => $deal->id,
                'user_id' => Auth::id(),
                'start' => Carbon::now(),
                'pipeline_status_id' => $newStatus->id,
            ]);

            $deal->pipeline_status_id = $newStatus->id;
            $deal->save();

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }

        return [
            'data' => $deal
        ];
    }

    private function processHooks(Deal $deal, PipelineStatus $statusFrom, PipelineStatus $statusTo)
    {
        $onExitHooks = PipelineStatusHook::where('pipeline_status_id', '=', $statusFrom->id)
            ->where('type', '=', PipelineStatusHook::TYPE_ON_EXIT)
            ->orderBy('order')
            ->get();

        foreach ($onExitHooks as $hook) {
            $this->processHook($hook, $deal, $statusFrom, $statusTo);
        }

        $onEnterHooks = PipelineStatusHook::where('pipeline_status_id', '=', $statusTo->id)
            ->where('type', '=', PipelineStatusHook::TYPE_ON_ENTER)
            ->orderBy('order')
            ->get();

        foreach ($onEnterHooks as $hook) {
            $this->processHook($hook, $deal, $statusFrom, $statusTo);
        }
    }

    private function processHook(PipelineStatusHook $hook, Deal $deal, PipelineStatus $statusFrom, PipelineStatus $statusTo)
    {
        $action = explode('@', $hook->hook);

        if (is_callable($action)) {
            call_user_func_array($action, [$deal, $statusFrom, $statusTo]);
        } else {
            throw new Exception('Hook not callable!');
        }

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Deal  $deal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Deal $deal)
    {
        if (!Laratrust::isAbleTo('deals-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'value' => 'nullable|numeric',
            'probability' => 'nullable|numeric',
            'observation' => 'nullable|string',
            'insurance_type' => 'required|integer',
            'new_insurance' => 'required|boolean',
            'old_insurance_company_id' => 'nullable|required_if:new_insurance,0|integer|exists:insurance_company,id',
            'limit_date' => 'nullable|required_if:new_insurance,0|date',
        ]);

        if ($validated['new_insurance']) {
            $validated['limit_date'] = null;
            $validated['old_insurance_company_id'] = null;
        }

        $deal->update($validated);

        return [
            'data' => $deal
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Deal  $deal
     * @return \Illuminate\Http\Response
     */
    public function destroy(Deal $deal)
    {
        //
    }
}
