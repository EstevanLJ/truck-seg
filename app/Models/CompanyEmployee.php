<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyEmployee extends Model
{
    use HasFactory;

    protected $table = 'company_employee';

    protected $fillable = [
        'person_id',
        'name',
        'role',
        'email',
        'phone',
        'secondary_phone',
        'has_whatsapp',
    ];

    protected $casts = [
        'has_whatsapp' => 'bool'
    ];

    public function company()
    {
        return $this->belongsTo(Person::class, 'person_id', 'id');
    }
}
