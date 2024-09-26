<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportationFormResponse extends Model
{
    use HasFactory;

    protected $table = 'transportation_form_response';

    protected $fillable = [
        'type',
        'quotation_id',
        'user_id',
        'version',
        'urban_route',
        'fluvial_route',
        'next_12_months_movment_forecast',
        'average_trip_value',
        'maximum_trip_value',
        'average_trips_month',
        'intended_limit_rctr_c',
        'intended_limit_rcf_dc',
        'fractioned_composition',
        'closed_composition',
        'has_tracking_system',
        'has_tracking_company',
        'tracking_company',
        'tracking_company_contact',
        'tracking_company_phone',
        'current_insurance_company',
        'due_date',
        'discounts',
        'observations',
    ];

    public function accidents()
    {
        return $this->hasMany(TransportationFormResponseAccident::class, 'transportation_form_response_id', 'id');
    }

    public function actuators()
    {
        return $this->hasMany(TransportationFormResponseActuator::class, 'transportation_form_response_id', 'id');
    }

    public function destinations()
    {
        return $this->hasMany(TransportationFormResponseDestination::class, 'transportation_form_response_id', 'id');
    }

    public function fleets()
    {
        return $this->hasMany(TransportationFormResponseFleet::class, 'transportation_form_response_id', 'id');
    }

    public function goodsTypes()
    {
        return $this->hasMany(TransportationFormResponseGoodsType::class, 'transportation_form_response_id', 'id');
    }

    public function goodsTypeOthers()
    {
        return $this->hasMany(TransportationFormResponseGoodsTypeOther::class, 'transportation_form_response_id', 'id');
    }

    public function sensors()
    {
        return $this->hasMany(TransportationFormResponseSensor::class, 'transportation_form_response_id', 'id');
    }

    public function shippers()
    {
        return $this->hasMany(TransportationFormResponseShipper::class, 'transportation_form_response_id', 'id');
    }

    public function trackers()
    {
        return $this->hasMany(TransportationFormResponseTracker::class, 'transportation_form_response_id', 'id');
    }

    public function valuesHistories()
    {
        return $this->hasMany(TransportationFormResponseValuesHistory::class, 'transportation_form_response_id', 'id');
    }



}
