<?php

namespace App\Http\Controllers;

use App\Models\CompanyEmployee;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class CompanyEmployeeController extends Controller
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
            'name' => 'required|string',
            'role' => 'nullable|string',
            'email' => 'nullable|string',
            'phone' => 'nullable|string',
            'secondary_phone' => 'nullable|string',
            'has_whatsapp' => 'nullable|boolean',
        ]);

        $companyEmployee = CompanyEmployee::create($validated);

        return [
            'data' => $companyEmployee
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CompanyEmployee  $companyEmployee
     * @return \Illuminate\Http\Response
     */
    public function show(CompanyEmployee $companyEmployee)
    {
        if (!Laratrust::isAbleTo('people-read')) {
            abort(401);
        }

        return [
            'data' => $companyEmployee
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CompanyEmployee  $companyEmployee
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CompanyEmployee $companyEmployee)
    {
        if (!Laratrust::isAbleTo('people-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'role' => 'nullable|string',
            'email' => 'nullable|string',
            'phone' => 'nullable|string',
            'secondary_phone' => 'nullable|string',
            'has_whatsapp' => 'nullable|boolean',
        ]);

        $companyEmployee->update($validated);

        return [
            'data' => $companyEmployee
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CompanyEmployee  $companyEmployee
     * @return \Illuminate\Http\Response
     */
    public function destroy(CompanyEmployee $companyEmployee)
    {
        if (!Laratrust::isAbleTo('people-update')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            $companyEmployee->delete();

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            report($e);

            abort(500);
        }

        return;
    }
}
