<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportationFormResponseGoodsTypeOther extends Model
{
    use HasFactory;

    protected $table = 'transportation_form_response_goods_type_other';

    protected $fillable = [
        'transportation_form_response_id',
        'goods_type',
        'percent',
    ];
}
