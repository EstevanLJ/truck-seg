<?php

namespace App\Http\Controllers\CRM;

use App\Http\Controllers\Controller;
use App\Models\DealLostReason;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class DealLostReasonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!Laratrust::isAbleTo('deal-lost-reasons-read')) {
            abort(401);
        }

        $dealLostReasons = DealLostReason::orderBy('id')->get();

        return [
            'data' => $dealLostReasons
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
        if (!Laratrust::isAbleTo('deal-lost-reasons-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:deal_lost_reason,name',
            'description' => 'nullable|string',
        ]);

        $dealLostReason = DealLostReason::create($validated);

        return [
            'data' => $dealLostReason
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DealLostReason  $dealLostReason
     * @return \Illuminate\Http\Response
     */
    public function show(DealLostReason $dealLostReason)
    {
        if (!Laratrust::isAbleTo('deal-lost-reasons-read')) {
            abort(401);
        }

        return [
            'data' => $dealLostReason
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DealLostReason  $dealLostReason
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DealLostReason $dealLostReason)
    {
        if (!Laratrust::isAbleTo('deal-lost-reasons-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:deal_lost_reason,name,' . $dealLostReason->id,
            'description' => 'nullable|string',
        ]);

        $dealLostReason->update($validated);

        return [
            'data' => $dealLostReason
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DealLostReason  $dealLostReason
     * @return \Illuminate\Http\Response
     */
    public function destroy(DealLostReason $dealLostReason)
    {
        if (!Laratrust::isAbleTo('deal-lost-reasons-delete')) {
            abort(401);
        }

        try {

            $dealLostReason->delete();

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            report($e);

            abort(500);
        }

        return;
    }
}
