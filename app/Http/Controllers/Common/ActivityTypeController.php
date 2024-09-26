<?php

namespace App\Http\Controllers\Common;

use App\Models\ActivityType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class ActivityTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (!Laratrust::isAbleTo('activity-types-read')) {
            abort(401);
        }

        $activityTypes = ActivityType::orderBy('name');

        if (!$request->has('all')) {
            $activityTypes->where('active', '=', '1');
        }

        $activityTypes = $activityTypes->get();

        return [
            'data' => $activityTypes
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
        if (!Laratrust::isAbleTo('activity-types-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:activity_type,name',
            'icon' => 'required|string',
            'active' => 'required|boolean',
        ]);

        $activityType = ActivityType::create($validated);

        return [
            'data' => $activityType
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ActivityType  $activityType
     * @return \Illuminate\Http\Response
     */
    public function show(ActivityType $activityType)
    {
        if (!Laratrust::isAbleTo('activity-types-read')) {
            abort(401);
        }

        return [
            'data' => $activityType
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ActivityType  $activityType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ActivityType $activityType)
    {
        if (!Laratrust::isAbleTo('activity-types-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:activity_type,name,' . $activityType->id,
            'icon' => 'required|string',
            'active' => 'required|boolean',
        ]);

        $activityType->update($validated);

        return [
            'data' => $activityType
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ActivityType  $activityType
     * @return \Illuminate\Http\Response
     */
    public function destroy(ActivityType $activityType)
    {
        if (!Laratrust::isAbleTo('activity-types-delete')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            $activityType->delete();

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            report($e);

            abort(500);
        }

        return;
    }
}
