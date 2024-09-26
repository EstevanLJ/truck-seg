<?php

namespace App\Http\Controllers\Quotations;

use App\Models\QuotationType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class QuotationTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (!Laratrust::isAbleTo('quotation-types-read')) {
            abort(401);
        }

        $quotationTypes = QuotationType::orderBy('name');

        if (!$request->has('all')) {
            $quotationTypes->where('active', '=', '1');
        }

        $quotationTypes = $quotationTypes->get();

        return [
            'data' => $quotationTypes
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
        if (!Laratrust::isAbleTo('quotation-types-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:quotation_type,name',
            'icon' => 'required|string',
            'active' => 'required|boolean',
        ]);

        $quotationType = QuotationType::create($validated);

        return [
            'data' => $quotationType
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\QuotationType  $quotationType
     * @return \Illuminate\Http\Response
     */
    public function show(QuotationType $quotationType)
    {
        if (!Laratrust::isAbleTo('quotation-types-read')) {
            abort(401);
        }

        return [
            'data' => $quotationType
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\QuotationType  $quotationType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, QuotationType $quotationType)
    {
        if (!Laratrust::isAbleTo('quotation-types-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:quotation_type,name,' . $quotationType->id,
            'icon' => 'required|string',
            'active' => 'required|boolean',
        ]);

        $quotationType->update($validated);

        return [
            'data' => $quotationType
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\QuotationType  $quotationType
     * @return \Illuminate\Http\Response
     */
    public function destroy(QuotationType $quotationType)
    {
        if (!Laratrust::isAbleTo('quotation-types-delete')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            $quotationType->delete();

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            report($e);

            abort(500);
        }

        return;
    }
}
