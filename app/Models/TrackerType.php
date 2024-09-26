<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrackerType extends Model
{
    use HasFactory;

    protected $table = 'tracker_type';

    protected $fillable = [
        'name',
        'active'
    ];
}
