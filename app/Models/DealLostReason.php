<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DealLostReason extends Model
{
    use HasFactory;

    protected $table = 'deal_lost_reason';

    protected $fillable = ['name', 'description'];
}
