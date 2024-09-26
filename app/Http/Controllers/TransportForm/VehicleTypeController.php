<?php

namespace App\Http\Controllers\TransportForm;

use App\Models\VehicleType;
use App\Http\Controllers\Controller;
use Laratrust\LaratrustFacade as Laratrust;

class VehicleTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!Laratrust::isAbleTo('vehicle-types-read')) {
            abort(401);
        }

        $data = VehicleType::orderBy('id')
            ->where('active', '=', 1)
            ->get();

        return [
            'data' => $data
        ];
    }
}
