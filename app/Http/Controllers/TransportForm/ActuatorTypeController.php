<?php

namespace App\Http\Controllers\TransportForm;

use App\Models\ActuatorType;
use App\Http\Controllers\Controller;
use Laratrust\LaratrustFacade as Laratrust;

class ActuatorTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!Laratrust::isAbleTo('actuators-types-read')) {
            abort(401);
        }

        $data = ActuatorType::orderBy('id')
            ->where('active', '=', 1)
            ->get();

        return [
            'data' => $data
        ];
    }
}
