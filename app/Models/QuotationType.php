<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuotationType extends Model
{
    use HasFactory;

    protected $table = 'quotation_type';

    protected $fillable = [
        'icon',
        'name',
        'active'
    ];

    protected $casts = [
        'active' => 'bool',
    ];
}
