<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Laratrust\LaratrustFacade as Laratrust;

class DocumentController extends Controller
{
    public function download($uuid)
    {
        if (!Laratrust::isAbleTo('documents-read')) {
            abort(401);
        }

        $document = Document::where('uuid', '=', $uuid)->first();

        if (!$document) {
            abort(404);
        }

        return Storage::download(
            $document->file,
            $document->original_name,
            [
                'Content-Disposition' => 'inline; filename=' . $document->original_name,
            ]
        );
    }
}
