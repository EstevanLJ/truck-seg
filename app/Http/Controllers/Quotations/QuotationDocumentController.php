<?php

namespace App\Http\Controllers\Quotations;

use Exception;
use App\Models\QuotationDocument;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\DocumentService;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class QuotationDocumentController extends Controller
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
        if (!Laratrust::isAbleTo('quotations-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'quotation_id' => 'required|integer|exists:quotation,id',
            'name' => 'required|string',
            'observation' => 'nullable|string',
            'file' => 'required|file',
        ]);

        try {
            DB::beginTransaction();

            $document = DocumentService::store($request->file('file'), $request->input('name'), $request->input('observation'), false);

            $quotationDocument = QuotationDocument::create([
                'quotation_id' => $validated['quotation_id'],
                'document_id' => $document->id,
            ]);

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            throw $e;
        }

        return [
            'data' => $quotationDocument
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\QuotationDocument  $quotationDocument
     * @return \Illuminate\Http\Response
     */
    public function show(QuotationDocument $quotationDocument)
    {
        if (!Laratrust::isAbleTo('quotations-read')) {
            abort(401);
        }

        $quotationDocument->load('document');

        return [
            'data' => $quotationDocument
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\QuotationDocument  $quotationDocument
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, QuotationDocument $quotationDocument)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\QuotationDocument  $quotationDocument
     * @return \Illuminate\Http\Response
     */
    public function destroy(QuotationDocument $quotationDocument)
    {
        if (!Laratrust::isAbleTo('quotations-update')) {
            abort(401);
        }

        try {

            DB::beginTransaction();

            $document = $quotationDocument->document;

            $quotationDocument->delete();

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
