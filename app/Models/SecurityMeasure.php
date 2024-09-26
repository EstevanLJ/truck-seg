<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecurityMeasure extends Model
{
    use HasFactory;

    protected $table = 'security_measure';

    protected $fillable = [
        'name',
        'active'
    ];
}
