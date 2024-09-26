<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $table = 'activity';

    protected $fillable = [
        'activity_type_id',
        'title',
        'description',
        'location',
        'date',
        'time_from',
        'time_to',
        'done_at',
        'assigned_to',
        'done_by',
    ];

    protected $appends = [
        'date_formatted', 'done_at_formatted', 'time_from_formatted', 'time_to_formatted'
    ];

    public function getDateFormattedAttribute()
    {
        return Carbon::parse($this->date)->format('d/m/Y');
    }

    public function getTimeFromFormattedAttribute()
    {
        return Carbon::parse($this->time_from)->format('H:i');
    }

    public function getTimeToFormattedAttribute()
    {
        return Carbon::parse($this->time_to)->format('H:i');
    }

    public function getDoneAtFormattedAttribute()
    {
        return $this->done_at ? Carbon::parse($this->done_at)->format('d/m/Y H:i') : null;
    }

    public function type()
    {
        return $this->belongsTo(ActivityType::class, 'activity_type_id', 'id');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to', 'id');
    }

    public function doneBy()
    {
        return $this->belongsTo(User::class, 'done_by', 'id');
    }

    public function dealActivity()
    {
        return $this->hasOne(DealActivity::class, 'activity_id', 'id');
    }

}
