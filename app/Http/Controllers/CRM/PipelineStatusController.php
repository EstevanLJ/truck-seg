<?php

namespace App\Http\Controllers\CRM;

use App\Http\Controllers\Controller;
use App\Models\PipelineStatus;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class PipelineStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!Laratrust::isAbleTo('pipelines-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'pipeline_id' => 'required|integer|exists:pipeline,id',
            'name' => 'required|string',
            'order' => 'required|integer',
            'days_to_notify' => 'nullable|integer',
            'can_win' => 'nullable|boolean',
        ]);

        $pipelineStatus = PipelineStatus::create($validated);

        return [
            'data' => $pipelineStatus
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PipelineStatus  $pipelineStatus
     * @return \Illuminate\Http\Response
     */
    public function show(PipelineStatus $pipelineStatus)
    {
        if (!Laratrust::isAbleTo('pipelines-read')) {
            abort(401);
        }

        return [
            'data' => $pipelineStatus
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PipelineStatus  $pipelineStatus
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PipelineStatus $pipelineStatus)
    {
        if (!Laratrust::isAbleTo('pipelines-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'order' => 'required|integer',
            'days_to_notify' => 'nullable|integer',
            'can_win' => 'nullable|boolean',
        ]);

        $pipelineStatus->update($validated);

        return [
            'data' => $pipelineStatus
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PipelineStatus  $pipelineStatus
     * @return \Illuminate\Http\Response
     */
    public function destroy(PipelineStatus $pipelineStatus)
    {
        if (!Laratrust::isAbleTo('pipelines-delete')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            $pipelineStatus->delete();

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            report($e);

            abort(500);
        }

        return;
    }
}
