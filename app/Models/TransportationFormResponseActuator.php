<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportationFormResponseActuator extends Model
{
    use HasFactory;
    
    protected $table = 'transportation_form_response_actuator';

    protected $fillable = [
        'transportation_form_response_id',
        'actuator_type_id',
    ];
}
