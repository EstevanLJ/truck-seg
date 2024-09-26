<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportationFormResponseDestination extends Model
{
    use HasFactory;

    protected $table = 'transportation_form_response_destination';

    protected $fillable = [
        'transportation_form_response_id',
        'origin',
        'destiny',
        'percentual',
    ];
}
