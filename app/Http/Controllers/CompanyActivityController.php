<?php

namespace App\Http\Controllers;

use App\Models\CompanyActivity;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class CompanyActivityController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!Laratrust::isAbleTo('people-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'person_id' => 'required|integer|exists:person,id',
            'code' => 'required|string',
            'description' => 'required|string',
        ]);

        $companyActivity = CompanyActivity::create($validated);

        return [
            'data' => $companyActivity
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CompanyActivity  $companyActivity
     * @return \Illuminate\Http\Response
     */
    public function show(CompanyActivity $companyActivity)
    {
        if (!Laratrust::isAbleTo('people-read')) {
            abort(401);
        }

        return [
            'data' => $companyActivity
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CompanyActivity  $companyActivity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CompanyActivity $companyActivity)
    {
        if (!Laratrust::isAbleTo('people-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'code' => 'required|string',
            'description' => 'required|string',
        ]);

        $companyActivity->update($validated);

        return [
            'data' => $companyActivity
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CompanyActivity  $companyActivity
     * @return \Illuminate\Http\Response
     */
    public function destroy(CompanyActivity $companyActivity)
    {
        if (!Laratrust::isAbleTo('people-update')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            $companyActivity->delete();

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            report($e);

            abort(500);
        }

        return;
    }
}
