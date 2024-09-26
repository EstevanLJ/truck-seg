<?php

namespace App\Http\Controllers\CRM;

use Exception;
use App\Http\Controllers\Controller;
use App\Models\DealDocument;
use Illuminate\Http\Request;
use App\Services\DocumentService;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class DealDocumentController extends Controller
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
        if (!Laratrust::isAbleTo('deals-update')) {
            abort(401);
        }

        \Log::info($request->all());

        $validated = $request->validate([
            'deal_id' => 'required|integer|exists:deal,id',
            'name' => 'nullable|string',
            'observation' => 'nullable|string',
            'file' => 'required|file',
        ]);

        try {
            DB::beginTransaction();

            $document = DocumentService::store($request->file('file'), $request->input('name'), $request->input('observation'), false);

            $dealDocument = DealDocument::create([
                'deal_id' => $validated['deal_id'],
                'document_id' => $document->id,
            ]);

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            throw $e;
        }

        return [
            'data' => $dealDocument
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DealDocument  $dealDocument
     * @return \Illuminate\Http\Response
     */
    public function show(DealDocument $dealDocument)
    {
        if (!Laratrust::isAbleTo('deals-read')) {
            abort(401);
        }

        $dealDocument->load('document');

        return [
            'data' => $dealDocument
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DealDocument  $dealDocument
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DealDocument $dealDocument)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DealDocument  $dealDocument
     * @return \Illuminate\Http\Response
     */
    public function destroy(DealDocument $dealDocument)
    {
        if (!Laratrust::isAbleTo('deals-delete')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            $document = $dealDocument->document;

            $dealDocument->delete();

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
