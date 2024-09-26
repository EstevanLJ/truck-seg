<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportationFormResponseGoodsType extends Model
{
    use HasFactory;

    protected $table = 'transportation_form_response_goods_types';

    protected $fillable = [
        'transportation_form_response_id',
        'goods_type_id',
        'packages',
        'percent',
        'maximum_limit',
    ];
}
