<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DealActivity extends Model
{
    use HasFactory;

    protected $table = 'deal_activity';

    protected $fillable = [
        'deal_id',
        'activity_id',
    ];

    protected $appends = [
        'description'
    ];

    public function getDescriptionAttribute()
    {
        return $this->deal->name . ' - ' . $this->activity->title;
    }

    public function deal()
    {
        return $this->belongsTo(Deal::class, 'deal_id', 'id');
    }

    public function activity()
    {
        return $this->belongsTo(Activity::class, 'activity_id', 'id');
    }

}
