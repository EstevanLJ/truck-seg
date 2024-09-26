<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportationFormResponseSensor extends Model
{
    use HasFactory;

    protected $table = 'transportation_form_response_sensor';

    protected $fillable = [
        'transportation_form_response_id',
        'sensor_type_id',
    ];
}
