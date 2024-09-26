<?php

namespace App\Http\Controllers\TransportForm;

use App\Models\SensorType;
use App\Http\Controllers\Controller;
use Laratrust\LaratrustFacade as Laratrust;

class SensorTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!Laratrust::isAbleTo('sensores-types-read')) {
            abort(401);
        }

        $data = SensorType::orderBy('id')
            ->where('active', '=', 1)
            ->get();

        return [
            'data' => $data
        ];
    }
}
