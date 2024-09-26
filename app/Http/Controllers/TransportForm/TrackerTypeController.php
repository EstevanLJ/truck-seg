<?php

namespace App\Http\Controllers\TransportForm;

use App\Models\TrackerType;
use App\Http\Controllers\Controller;
use Laratrust\LaratrustFacade as Laratrust;

class TrackerTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!Laratrust::isAbleTo('trackers-types-read')) {
            abort(401);
        }

        $data = TrackerType::orderBy('id')
            ->where('active', '=', 1)
            ->get();

        return [
            'data' => $data
        ];
    }
}
