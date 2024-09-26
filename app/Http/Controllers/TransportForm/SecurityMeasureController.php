<?php

namespace App\Http\Controllers\TransportForm;

use App\Models\SecurityMeasure;
use App\Http\Controllers\Controller;
use Laratrust\LaratrustFacade as Laratrust;

class SecurityMeasureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!Laratrust::isAbleTo('goods-types-read')) {
            abort(401);
        }

        $data = SecurityMeasure::orderBy('id')
            ->where('active', '=', 1)
            ->get();

        return [
            'data' => $data
        ];
    }
}
