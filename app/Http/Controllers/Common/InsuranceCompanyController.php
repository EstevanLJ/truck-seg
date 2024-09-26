<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Models\InsuranceCompany;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class InsuranceCompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!Laratrust::isAbleTo('insurance-companies-read')) {
            abort(401);
        }

        $insuranceCompanies = InsuranceCompany::orderBy('id')->get();

        return [
            'data' => $insuranceCompanies
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
        if (!Laratrust::isAbleTo('insurance-companies-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:insurance_company,name',
            'abbreviation' => 'required|string|unique:insurance_company,abbreviation',
            'quotation_time' => 'nullable|integer',
        ]);

        $insuranceCompany = InsuranceCompany::create($validated);

        return [
            'data' => $insuranceCompany
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\InsuranceCompany  $insuranceCompany
     * @return \Illuminate\Http\Response
     */
    public function show(InsuranceCompany $insuranceCompany)
    {
        if (!Laratrust::isAbleTo('insurance-companies-read')) {
            abort(401);
        }

        return [
            'data' => $insuranceCompany
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\InsuranceCompany  $insuranceCompany
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InsuranceCompany $insuranceCompany)
    {
        if (!Laratrust::isAbleTo('insurance-companies-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:insurance_company,name,' . $insuranceCompany->id,
            'abbreviation' => 'required|string|unique:insurance_company,abbreviation,' . $insuranceCompany->id,
            'quotation_time' => 'nullable|integer',
        ]);

        $insuranceCompany->update($validated);

        return [
            'data' => $insuranceCompany
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\InsuranceCompany  $insuranceCompany
     * @return \Illuminate\Http\Response
     */
    public function destroy(InsuranceCompany $insuranceCompany)
    {
        if (!Laratrust::isAbleTo('insurance-companies-delete')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            $insuranceCompany->delete();

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            report($e);

            abort(500);
        }

        return;
    }
}
