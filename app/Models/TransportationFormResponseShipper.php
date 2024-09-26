<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportationFormResponseShipper extends Model
{
    use HasFactory;

    protected $table = 'transportation_form_response_shipper';

    protected $fillable = [
        'transportation_form_response_id',
        'shipper_name',
        'document',
        'has_ddr',
    ];
}
