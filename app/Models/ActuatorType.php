<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActuatorType extends Model
{
    use HasFactory;

    protected $table = 'actuator_type';

    protected $fillable = [
        'form_type',
        'name',
        'active'
    ];
}
