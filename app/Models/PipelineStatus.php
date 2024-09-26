<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PipelineStatus extends Model
{
    use HasFactory;

    protected $table = 'pipeline_status';

    protected $fillable = ['pipeline_id', 'name', 'order', 'days_to_notify', 'can_win', 'can_lose'];

    public function pipeline()
    {
        return $this->belongsTo(Pipeline::class, 'pipeline_id', 'id');
    }

}
