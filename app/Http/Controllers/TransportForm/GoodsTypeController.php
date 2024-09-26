<?php

namespace App\Http\Controllers\TransportForm;

use App\Models\GoodsType;
use App\Http\Controllers\Controller;
use Laratrust\LaratrustFacade as Laratrust;

class GoodsTypeController extends Controller
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

        $data = GoodsType::orderBy('id')
            ->where('active', '=', 1)
            ->get();

        return [
            'data' => $data
        ];
    }
}
