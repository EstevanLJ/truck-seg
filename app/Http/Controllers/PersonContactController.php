<?php

namespace App\Http\Controllers;

use App\Models\PersonContact;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class PersonContactController extends Controller
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
            'type' => 'required|string|in:' . PersonContact::ARRAY_TYPES,
            'value' => 'required|string',
        ]);

        $personContact = PersonContact::create($validated);

        return [
            'data' => $personContact
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PersonContact  $personContact
     * @return \Illuminate\Http\Response
     */
    public function show(PersonContact $personContact)
    {
        if (!Laratrust::isAbleTo('people-read')) {
            abort(401);
        }

        return [
            'data' => $personContact
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PersonContact  $personContact
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PersonContact $personContact)
    {
        if (!Laratrust::isAbleTo('people-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'type' => 'required|string|in:' . PersonContact::ARRAY_TYPES,
            'value' => 'required|string',
        ]);

        $personContact->update($validated);

        return [
            'data' => $personContact
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PersonContact  $personContact
     * @return \Illuminate\Http\Response
     */
    public function destroy(PersonContact $personContact)
    {
        if (!Laratrust::isAbleTo('people-delete')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            $personContact->delete();

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            report($e);

            abort(500);
        }

        return;
    }
}
