<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DealHistory extends Model
{
    use HasFactory;

    protected $table = 'deal_history';

    const CREATION = 'CREATION';
    const STATUS_CHANGE = 'STATUS_CHANGE';
    const ACTIVITY_CREATED = 'ACTIVITY_CREATED';
    const ACTIVITY_DONE = 'ACTIVITY_DONE';
    const ACTIVITY_REOPENED = 'ACTIVITY_REOPENED';
    const ACTIVITY_DELETED = 'ACTIVITY_DELETED';
    const OPEN = 'OPEN';
    const WON = 'WON';
    const LOST = 'LOST';

    protected $fillable = [
        'deal_id',
        'event_type',
        'description',
        'object_id',
        'user_id',
    ];

    protected $appends = [
        'date_formatted',
        'time_formatted',
        'icon'
    ];

    public const ICONS = [
        'CREATION' => 'far fa-flag',
        'STATUS_CHANGE' => 'far fa-forward',
        'ACTIVITY_CREATED' => 'far fa-calendar-plus',
        'ACTIVITY_DONE' => 'far fa-calendar-check',
        'ACTIVITY_REOPENED' => 'far fa-undo',
        'ACTIVITY_DELETED' => 'far fa-trash',
        'OPEN' => 'far fa-flag',
        'WON' => 'far fa-thumbs-up',
        'LOST' => 'far fa-thumbs-down',
    ];

    public function getDateFormattedAttribute()
    {
        return Carbon::parse($this->created_at)->format('d/m/Y');
    }

    public function getTimeFormattedAttribute()
    {
        return Carbon::parse($this->created_at)->format('H:i');
    }

    public function getIconAttribute()
    {
        return self::ICONS[$this->event_type] ?? '';
    }

}
