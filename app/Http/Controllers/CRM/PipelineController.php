<?php

namespace App\Http\Controllers\CRM;

use App\Http\Controllers\Controller;
use App\Models\Pipeline;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class PipelineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!Laratrust::isAbleTo('pipelines-read')) {
            abort(401);
        }

        $pipelines = Pipeline::orderBy('name')->get();

        return [
            'data' => $pipelines
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
        if (!Laratrust::isAbleTo('pipelines-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:pipeline,name',
            'description' => 'nullable|string',
        ]);

        $pipeline = Pipeline::create($validated);

        return [
            'data' => $pipeline
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pipeline  $pipeline
     * @return \Illuminate\Http\Response
     */
    public function show(Pipeline $pipeline)
    {
        if (!Laratrust::isAbleTo('pipelines-read')) {
            abort(401);
        }

        $pipeline->load('statuses');

        return [
            'data' => $pipeline
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pipeline  $pipeline
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pipeline $pipeline)
    {
        if (!Laratrust::isAbleTo('pipelines-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:pipeline,name,' . $pipeline->id,
            'description' => 'nullable|string',
        ]);

        $pipeline->update($validated);

        return [
            'data' => $pipeline
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pipeline  $pipeline
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pipeline $pipeline)
    {
        if (!Laratrust::isAbleTo('pipelines-delete')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            $pipeline->delete();

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            report($e);

            abort(500);
        }

        return;
    }
}
