<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

require __DIR__.'/auth.php';

Route::get('documents/{uuid}/download', '\\App\\Http\\Controllers\\DocumentController@download');
Route::middleware(['auth'], function () {
});

Route::fallback(function ($request = null) {

    if (\Illuminate\Support\Facades\Auth::check()) {
        return view('spa');
    }

    return redirect('login');

});
