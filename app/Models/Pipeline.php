<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pipeline extends Model
{
    use HasFactory;

    protected $table = 'pipeline';

    protected $fillable = ['name', 'description'];

    public function statuses()
    {
        return $this->hasMany(PipelineStatus::class, 'pipeline_id', 'id')->orderBy('order', 'asc');
    }

}
