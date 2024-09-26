<?php

namespace App\Http\Controllers\Quotations;

use App\Models\Quotation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laratrust\LaratrustFacade as Laratrust;

class QuotationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (!Laratrust::isAbleTo('quotations-read')) {
            abort(401);
        }

        $data = Quotation::with('client', 'type', 'createdBy', 'assignedTo');

        if ($request->has('status') && in_array($request->input('status'), array_keys(Quotation::STATUSES))) {
            $data->where('status', '=', $request->input('status'));
        }

        if ($request->has('client_id')) {
            $data->where('client_id', '=', $request->input('client_id'));
        }

        if ($request->has('assigned_to')) {
            $data->where('assigned_to', '=', $request->input('assigned_to'));
        }

        $data = $data->get();

        return [
            'data' => $data
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Quotation  $quotation
     * @return \Illuminate\Http\Response
     */
    public function show(Quotation $quotation)
    {
        if (!Laratrust::isAbleTo('quotations-read')) {
            abort(401);
        }

        $quotation->load('client', 'type', 'createdBy', 'assignedTo', 'documents', 'quotationDeal');

        return [
            'data' => $quotation
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Quotation  $quotation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Quotation $quotation)
    {
        if (!Laratrust::isAbleTo('quotations-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'client_id' => 'required|integer|exists:person,id',
            'quotation_type_id' => 'required|integer|exists:quotation_type,id',
            'status' => 'required|integer|in:' . Quotation::STATUS_ARRAY,
            'name' => 'required|string',
            'observation' => 'nullable|string',
            'due_to' => 'required|date',
            'assigned_to' => 'nullable|integer|exists:users,id',
        ]);

        $quotation->update($validated);

        return [
            'data' => $quotation
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Quotation  $quotation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Quotation $quotation)
    {
        //
    }
}
