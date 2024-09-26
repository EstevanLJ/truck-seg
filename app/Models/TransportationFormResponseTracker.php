<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportationFormResponseTracker extends Model
{
    use HasFactory;

    protected $table = 'transportation_form_response_tracker';

    protected $fillable = [
        'transportation_form_response_id',
        'tracker_type_id',
    ];
}
