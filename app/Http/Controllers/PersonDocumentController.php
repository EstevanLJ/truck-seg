<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\PersonDocument;
use App\Services\DocumentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class PersonDocumentController extends Controller
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
        if (!Laratrust::isAbleTo('people-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'person_id' => 'required|integer|exists:person,id',
            'name' => 'required|string',
            'observation' => 'nullable|string',
            'file' => 'required|file',
        ]);

        try {
            DB::beginTransaction();

            $document = DocumentService::store($request->file('file'), $request->input('name'), $request->input('observation'), false);

            $personDocument = PersonDocument::create([
                'person_id' => $validated['person_id'],
                'document_id' => $document->id,
            ]);

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            throw $e;
        }

        return [
            'data' => $personDocument
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PersonDocument  $personDocument
     * @return \Illuminate\Http\Response
     */
    public function show(PersonDocument $personDocument)
    {
        if (!Laratrust::isAbleTo('people-read')) {
            abort(401);
        }

        $personDocument->load('document');

        return [
            'data' => $personDocument
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PersonDocument  $personDocument
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PersonDocument $personDocument)
    {
        if (!Laratrust::isAbleTo('people-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'observation' => 'nullable|string',
            'file' => 'nullable|file',
        ]);

        if ($request->has('file')) {
            try {
                DB::beginTransaction();

                $document = DocumentService::store($request->file('file'), $request->input('name'), $request->input('observation'), false);

                $oldDocument = $personDocument->document;

                DocumentService::destroy($oldDocument);

                $personDocument->document_id = $document->id;
                $personDocument->update();

                DB::commit();
            } catch (Exception $e) {

                DB::rollBack();

                throw $e;
            }
        } else {
            $document = $personDocument->document;

            $document->name = $validated['name'];
            $document->observation = $validated['observation'];
            $document->save();
        }

        return [
            'data' => $personDocument
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PersonDocument  $personDocument
     * @return \Illuminate\Http\Response
     */
    public function destroy(PersonDocument $personDocument)
    {
        if (!Laratrust::isAbleTo('people-delete')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            $document = $personDocument->document;

            $personDocument->delete();

            DocumentService::destroy($document);

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            report($e);

            abort(500);
        }

        return;
    }
}
