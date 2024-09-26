<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    use HasFactory;

    protected $table = 'quotation';

    protected $fillable = [
        'client_id',
        'quotation_type_id',
        'status',
        'name',
        'observation',
        'due_to',
        'assigned_to',
        'created_by'
    ];

    public const STATUS_ARRAY = '0,1,2,3';
    public const STATUS_WAITING = 0;
    public const STATUS_IN_ATTENDANCE = 1;
    public const STATUS_DONE = 2;
    public const STATUS_CANCELED = 3;
    public const STATUSES = [
        'Aguardando', 'Atendimento', 'Finalizada', 'Cancelada'
    ];

    protected $appends = [
        'status_description', 'due_to_formatted'
    ];

    public function getDueToFormattedAttribute()
    {
        return Carbon::parse($this->due_to)->format('d/m/Y');
    }

    public function getStatusDescriptionAttribute()
    {
        return self::STATUSES[$this->status] ?? '';
    }

    public function client()
    {
        return $this->belongsTo(Person::class, 'client_id', 'id');
    }

    public function type()
    {
        return $this->belongsTo(QuotationType::class, 'quotation_type_id', 'id');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to', 'id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function documents()
    {
        return $this->belongsToMany(Document::class, 'quotation_document', 'quotation_id', 'document_id');
    }

    public function quotationDeal()
    {
        return $this->hasOne(QuotationDeal::class, 'quotation_id', 'id');
    }
}
