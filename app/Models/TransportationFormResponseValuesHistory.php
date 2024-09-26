<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportationFormResponseValuesHistory extends Model
{
    use HasFactory;

    protected $table = 'transportation_form_response_values_history';

    protected $fillable = [
        'transportation_form_response_id',
        'month_year',
        'value',
    ];
}
