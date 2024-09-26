<?php

namespace App\Models;

use App\Utils\FormatUtils;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $table = 'person';

    protected $fillable = [
        'type',
        'name',
        'document',
        'trading_name',
        'corporate',
        'contact_name',
        'email',
        'phone',
        'main_activity',
        'main_activity_code',
        'share_capital',
        'juridic_nature',
        'antt_register',
        'corporate',
        'creation_date',
    ];

    public const ARRAY_TYPES = '0,1';
    public const TYPE_PERSON = 0;
    public const TYPE_COMPANY = 1;
    public const TYPES = [
        'Física', 'Jurídica'
    ];

    protected $appends = [
        'type_description', 'formated_document'
    ];

    public function getTypeDescriptionAttribute()
    {
        return self::TYPES[$this->type];
    }

    public function getFormatedDocumentAttribute()
    {
        if ($this->type == self::TYPE_PERSON) {
            return FormatUtils::formatCpf($this->document);
        } else if ($this->type == self::TYPE_COMPANY) {
            return FormatUtils::formatCnpj($this->document);
        } else {
            return '';
        }
    }

    public function addresses()
    {
        return $this->hasMany(PersonAddress::class, 'person_id', 'id')->orderBy('main', 'desc');
    }

    public function contacts()
    {
        return $this->hasMany(PersonContact::class, 'person_id', 'id');
    }

    public function activities()
    {
        return $this->hasMany(CompanyActivity::class, 'person_id', 'id');
    }

    public function employees()
    {
        return $this->hasMany(CompanyEmployee::class, 'person_id', 'id');
    }

    public function documents()
    {
        return $this->belongsToMany(Document::class, 'person_document', 'person_id', 'document_id');
    }

}

