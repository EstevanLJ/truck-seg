<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::get('me', '\\App\\Http\\Controllers\\ProfileController@me');
    Route::apiResource('users', \App\Http\Controllers\Admin\UserController::class);
    Route::apiResource('roles', \App\Http\Controllers\Admin\RoleController::class);
    Route::apiResource('permissions', \App\Http\Controllers\Admin\PermissionController::class);

    Route::apiResource('countries', \App\Http\Controllers\Common\CountryController::class)->only(['index']);
    Route::apiResource('states', \App\Http\Controllers\Common\StateController::class)->only(['index']);
    Route::apiResource('cities', \App\Http\Controllers\Common\CityController::class)->only(['index']);
    Route::apiResource('insurance-companies', \App\Http\Controllers\Common\InsuranceCompanyController::class);
    Route::apiResource('activity-types', \App\Http\Controllers\Common\ActivityTypeController::class);
    Route::apiResource('quotation-types', \App\Http\Controllers\Quotations\QuotationTypeController::class);

    Route::apiResource('deal-lost-reasons', \App\Http\Controllers\CRM\DealLostReasonController::class);
    Route::apiResource('pipelines', \App\Http\Controllers\CRM\PipelineController::class);
    Route::apiResource('pipeline-statuses', \App\Http\Controllers\CRM\PipelineStatusController::class);

    Route::apiResource('actuators-types', \App\Http\Controllers\TransportForm\ActuatorTypeController::class)->only(['index']);
    Route::apiResource('goods-types', \App\Http\Controllers\TransportForm\GoodsTypeController::class)->only(['index']);
    Route::apiResource('sensores-types', \App\Http\Controllers\TransportForm\SensorTypeController::class)->only(['index']);
    Route::apiResource('trackers-types', \App\Http\Controllers\TransportForm\TrackerTypeController::class)->only(['index']);
    Route::apiResource('vehicle-types', \App\Http\Controllers\TransportForm\VehicleTypeController::class)->only(['index']);
    Route::apiResource('security-measures', \App\Http\Controllers\TransportForm\SecurityMeasureController::class)->only(['index']);
    Route::apiResource('transportation-form-responses', \App\Http\Controllers\TransportForm\TransportationFormResponseController::class)->only(['store', 'show']);

    Route::apiResource('quotation-documents', \App\Http\Controllers\Quotations\QuotationDocumentController::class)->only(['store', 'show', 'destroy']);
    Route::apiResource('quotations', \App\Http\Controllers\Quotations\QuotationController::class)->only(['index', 'show', 'update']);

    Route::put('deals/{deal}/change-finished-status', '\\App\\Http\\Controllers\\CRM\\DealController@changeFinishedStatus');
    Route::put('deals/{deal}/change-status', '\\App\\Http\\Controllers\\CRM\\DealController@changeStatus');
    Route::apiResource('deal-documents', \App\Http\Controllers\CRM\DealDocumentController::class)->only(['store', 'delete']);
    Route::apiResource('deals', \App\Http\Controllers\CRM\DealController::class)->only(['index', 'store', 'show', 'update']);

    Route::patch('activities/{activity}/change-status', '\\App\\Http\\Controllers\\ActivityController@changeStatus');
    Route::apiResource('activities', \App\Http\Controllers\ActivityController::class);

    Route::get('people/search-document', '\\App\\Http\\Controllers\\PersonController@searchDocument');
    Route::apiResource('person-addresses', \App\Http\Controllers\PersonAddressController::class)->except(['index']);
    Route::apiResource('person-contacts', \App\Http\Controllers\PersonContactController::class)->except(['index']);
    Route::apiResource('person-documents', \App\Http\Controllers\PersonDocumentController::class)->except(['index']);
    Route::apiResource('company-activities', \App\Http\Controllers\CompanyActivityController::class)->except(['index']);
    Route::apiResource('company-employees', \App\Http\Controllers\CompanyEmployeeController::class)->except(['index']);
    Route::apiResource('people', \App\Http\Controllers\PersonController::class)->except(['destroy']);
});
