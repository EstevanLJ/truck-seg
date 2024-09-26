<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DealStatusChange extends Model
{
    use HasFactory;

    protected $table = 'deal_status_change';

    protected $fillable = [
        'deal_id',
        'pipeline_status_id',
        'start',
        'user_id'
    ];

    public function pipeline_status()
    {
        return $this->belongsTo(PipelineStatus::class, 'pipeline_status_id', 'id');
    }
}
