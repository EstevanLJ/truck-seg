<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    use HasFactory;

    protected $table = 'deal';

    protected $fillable = [
        'pipeline_id',
        'pipeline_status_id',
        'name',
        'insurance_type',
        'new_insurance',
        'old_insurance_company_id',
        'value',
        'probability',
        'observation',
        'limit_date',
        'client_id',
        'owner_id',
        'finished_status',
        'finished_date',
        'finished_value',
        'insurance_company_id',
        'deal_lost_reason_id',
        'finished_observation',
    ];

    protected $appends = [
        'limit_date_formatted',
        'finished_status_descripion',
        'finished_date_formatted',
        'value_formatted'
    ];

    protected $casts = [
        'value' => 'float',
        'finished_value' => 'float',
        'new_insurance' => 'boolean',
    ];

    public const FINISHED_STATUS_ARRAY = '0,1,2';
    public const FINISHED_STATUS_OPEN = 0;
    public const FINISHED_STATUS_WON = 1;
    public const FINISHED_STATUS_LOST = 2;
    public const FINISHED_STATUSES = [
        'Open', 'Won', 'Lost'
    ];

    public const INSURANCE_TYPES_ARRAY = '0,1';
    public const INSURANCE_TYPES = [
        'Transportador', 'Embarcador'
    ];

    public function getValueFormattedAttribute()
    {
        return number_format($this->value, 2, ',', '.');
    }

    public function getLimitDateFormattedAttribute()
    {
        return Carbon::parse($this->limit_date)->format('d/m/Y');
    }

    public function getFinishedDateFormattedAttribute()
    {
        return Carbon::parse($this->finished_date)->format('d/m/Y');
    }

    public function getFinishedStatusDescripionAttribute()
    {
        return self::FINISHED_STATUSES[$this->finished_status] ?? '';
    }

    public function client()
    {
        return $this->belongsTo(Person::class, 'client_id', 'id');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }

    public function pipeline()
    {
        return $this->belongsTo(Pipeline::class, 'pipeline_id', 'id');
    }

    public function lostReason()
    {
        return $this->belongsTo(DealLostReason::class, 'deal_lost_reason_id', 'id');
    }

    public function oldInsuranceCompany()
    {
        return $this->belongsTo(InsuranceCompany::class, 'old_insurance_company_id', 'id');
    }

    public function insuranceCompany()
    {
        return $this->belongsTo(InsuranceCompany::class, 'insurance_company_id', 'id');
    }

    public function pipeline_status()
    {
        return $this->belongsTo(PipelineStatus::class, 'pipeline_status_id', 'id');
    }

    public function histories()
    {
        return $this->hasMany(DealHistory::class, 'deal_id', 'id')->orderBy('created_at', 'desc');
    }

    public function statusChanges()
    {
        return $this->hasMany(DealStatusChange::class, 'deal_id', 'id');
    }

    public function activities()
    {
        return $this->belongsToMany(Activity::class, 'deal_activity', 'deal_id', 'activity_id')->orderBy('date', 'asc')->orderBy('time_from', 'asc')->withPivot(['id']);
    }

    public function documents()
    {
        return $this->belongsToMany(Document::class, 'deal_document', 'deal_id', 'document_id');
    }

    public function quotationDeal()
    {
        return $this->hasOne(QuotationDeal::class, 'deal_id', 'id');
    }

}
