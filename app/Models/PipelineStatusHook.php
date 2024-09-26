<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PipelineStatusHook extends Model
{
    use HasFactory;

    protected $table = 'pipeline_status_hook';

    protected $fillable = [
        'pipeline_status_id',
        'type',
        'hook',
        'order'
    ];

    public const TYPE_ON_ENTER = 'ON_ENTER';
    public const TYPE_ON_EXIT = 'ON_EXIT';

}
