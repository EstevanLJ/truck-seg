<?php

namespace App\Services;

use App\Models\Document;
use Exception;
use Illuminate\Http\UploadedFile as File;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DocumentService
{

    public static function store(File $file, $name = null, $observation = null, $public = false)
    {
        $original_name = $file->getClientOriginalName();
        $size = $file->getSize();

        //Armazena o arquivo
        $file_name = $file->store('documents');

        return Document::create([
            'uuid' => Str::uuid(),
            'user_id' => Auth::id(),
            'name' => $name ?? $original_name,
            'file' => $file_name,
            'original_name' => $original_name,
            'size' => $size,
            'public' => $public,
            'observation' => $observation,
        ]);
    }

    public static function destroy(Document $document)
    {
        try {
            DB::beginTransaction();

            $file = $document->file;
            $document->delete();

            Storage::delete($file);

            DB::commit();
        } catch (Exception $e) {

            DB::rollBack();

            throw $e;
        }
    }
}
