<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportationFormResponseAccident extends Model
{
    use HasFactory;

    protected $table = 'transportation_form_response_accident';

    protected $fillable = [
        'transportation_form_response_id',
        'goods_value',
        'loss_value',
        'cause',
        'date',
        'shippers_involved',
    ];
}
