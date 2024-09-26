<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\DealActivity;
use App\Models\DealHistory;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $activities = Activity::with('assignedTo', 'type', 'dealActivity')
            ->where('assigned_to', '=', Auth::id());

        if ($request->has('from')) {
            $activities->where('date', '>=', $request->input('from'));
        }

        if ($request->has('to')) {
            $activities->where('date', '<=', $request->input('to'));
        }

        if ($request->has('activity_type_id')) {
            $activities->where('activity_type_id', '=', $request->input('activity_type_id'));
        }

        $activities->orderBy('date', 'asc');
        $activities->orderBy('time_from', 'asc');

        $activities = $activities->get();

        return [
            'data' => $activities
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
        if (!Laratrust::isAbleTo('activities-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'deal_id' => 'nullable|integer|exists:deal,id',
            'activity_type_id' => 'required|integer|exists:activity_type,id',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
            'date' => 'required|date',
            'time_from' => 'nullable|date_format:H:i:s',
            'time_to' => 'nullable|date_format:H:i:s',
            'done_at' => 'nullable|date',
        ]);

        $validated['assigned_to'] = Auth::id();

        $activity = Activity::create($validated);

        if (isset($validated['deal_id']) && $validated['deal_id']) {
            $dealActivity = DealActivity::create([
                'deal_id' => $validated['deal_id'],
                'activity_id' => $activity->id,
            ]);

            DealHistory::create([
                'deal_id' => $dealActivity->deal_id,
                'event_type' => DealHistory::ACTIVITY_CREATED,
                'description' => 'The activity ' . $activity->title . ' was created',
                'object_id' => $activity->id,
                'user_id' => Auth::id(),
            ]);
        }

        return [
            'data' => $activity
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DealActivity  $dealActivity
     * @return \Illuminate\Http\Response
     */
    public function show(Activity $activity)
    {
        if (!Laratrust::isAbleTo('activities-read')) {
            abort(401);
        }

        $activity->load('dealActivity');

        return [
            'data' => $activity
        ];
    }

    /**
     * Mark the activity as done.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Activity $activity
     * @return \Illuminate\Http\Response
     */
    public function changeStatus(Request $request, Activity $activity)
    {
        if (!Laratrust::isAbleTo('activities-read')) {
            abort(401);
        }

        $this->processDone($activity, $request->input('done', NULL));

        return [
            'data' => $activity
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Activity $activity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Activity $activity)
    {
        if (!Laratrust::isAbleTo('activities-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'activity_type_id' => 'required|integer|exists:activity_type,id',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
            'date' => 'required|date',
            'time_from' => 'nullable|date_format:H:i:s',
            'time_to' => 'nullable|date_format:H:i:s',
        ]);

        $activity->update($validated);

        $this->processDone($activity, $request->input('done', NULL));

        return [
            'data' => $activity
        ];
    }

    private function processDone(Activity $activity, $done)
    {
        if ($done === NULL) {
            return;
        }

        if ($done) {
            $activity->done_by = Auth::id();
            $activity->done_at = Carbon::now();

            if ($activity->dealActivity) {
                DealHistory::create([
                    'deal_id' => $activity->dealActivity->deal_id,
                    'event_type' => DealHistory::ACTIVITY_DONE,
                    'description' => 'A atividade ' . $activity->title . ' foi finalizada',
                    'object_id' => $activity->id,
                    'user_id' => Auth::id(),
                ]);
            }
        } else {

            $activity->done_by = NULL;
            $activity->done_at = NULL;

            if ($activity->dealActivity) {
                DealHistory::create([
                    'deal_id' => $activity->dealActivity->deal_id,
                    'event_type' => DealHistory::ACTIVITY_REOPENED,
                    'description' => 'A atividade ' . $activity->title . ' foi reaberta',
                    'object_id' => $activity->id,
                    'user_id' => Auth::id(),
                ]);
            }
        }

        $activity->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Activity $activity
     * @return \Illuminate\Http\Response
     */
    public function destroy(Activity $activity)
    {
        if (!Laratrust::isAbleTo('activities-delete')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            if ($activity->dealActivity) {
                DealHistory::create([
                    'deal_id' => $activity->dealActivity->deal_id,
                    'event_type' => DealHistory::ACTIVITY_DELETED,
                    'description' => 'A atividade ' . $activity->title . ' foi removida',
                    'object_id' => $activity->id,
                    'user_id' => Auth::id(),
                ]);

                $activity->dealActivity->delete();
            }

            $activity->delete();

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            report($e);

            abort(500);
        }

        return;


        return;
    }
}
