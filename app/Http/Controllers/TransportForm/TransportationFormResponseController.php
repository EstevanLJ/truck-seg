<?php

namespace App\Http\Controllers\TransportForm;

use App\Models\TransportationFormResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laratrust\LaratrustFacade as Laratrust;

class TransportationFormResponseController extends Controller
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
        if (!Laratrust::isAbleTo('transportation-form-responses-create')) {
            abort(401);
        }

        \Log::info($request);

        return;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TransportationFormResponse  $transportationFormResponse
     * @return \Illuminate\Http\Response
     */
    public function show(TransportationFormResponse $transportationFormResponse)
    {
        if (!Laratrust::isAbleTo('transportation-form-responses-read')) {
            abort(401);
        }

        $transportationFormResponse->load(
            'accidents',
            'actuators',
            'destinations',
            'fleets',
            'goodsTypes',
            'goodsTypeOthers',
            'sensors',
            'shippers',
            'trackers',
            'valuesHistories',
        );

        return [
            'data' => $transportationFormResponse
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TransportationFormResponse  $transportationFormResponse
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TransportationFormResponse $transportationFormResponse)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TransportationFormResponse  $transportationFormResponse
     * @return \Illuminate\Http\Response
     */
    public function destroy(TransportationFormResponse $transportationFormResponse)
    {
        //
    }
}
