<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportationFormResponseFleet extends Model
{
    use HasFactory;
    
    protected $table = 'transportation_form_response_fleet';

    protected $fillable = [
        'transportation_form_response_id',
        'fleet_origin',
        'quantity',
        'characteristics',
    ];
}
