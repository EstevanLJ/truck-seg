<?php

namespace App\Http\Controllers;

use App\Models\PersonAddress;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class PersonAddressController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!Laratrust::isAbleTo('people-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'person_id' => 'required|integer|exists:person,id',
            'description' => 'required|string',
            'main' => 'required|boolean',
            'address' => 'required|string',
            'number' => 'required|string',
            'complement' => 'nullable|string',
            'district' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|size:2',
            'zip_code' => 'required|digits:8',
        ]);

        $personAddress = PersonAddress::create($validated);

        if ($personAddress->main) {
            PersonAddress::where('person_id', '=', $personAddress->person_id)
                ->where('id', '!=', $personAddress->id)
                ->update(['main' => false]);
        }

        return [
            'data' => $personAddress
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PersonAddress  $personAddress
     * @return \Illuminate\Http\Response
     */
    public function show(PersonAddress $personAddress)
    {
        if (!Laratrust::isAbleTo('people-read')) {
            abort(401);
        }

        return [
            'data' => $personAddress
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PersonAddress  $personAddress
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PersonAddress $personAddress)
    {
        if (!Laratrust::isAbleTo('people-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'description' => 'required|string',
            'main' => 'required|boolean',
            'address' => 'required|string',
            'number' => 'required|string',
            'complement' => 'nullable|string',
            'district' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|size:2',
            'zip_code' => 'required|digits:8',
        ]);

        $personAddress->update($validated);

        if ($personAddress->main) {
            PersonAddress::where('person_id', '=', $personAddress->person_id)
                ->where('id', '!=', $personAddress->id)
                ->update(['main' => false]);
        }

        return [
            'data' => $personAddress
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PersonAddress  $personAddress
     * @return \Illuminate\Http\Response
     */
    public function destroy(PersonAddress $personAddress)
    {
        if (!Laratrust::isAbleTo('people-delete')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            $personAddress->delete();

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            report($e);

            abort(500);
        }

        return;
    }
}
