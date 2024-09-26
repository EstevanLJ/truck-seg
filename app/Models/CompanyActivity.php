<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyActivity extends Model
{
    use HasFactory;

    protected $table = 'company_activity';

    protected $fillable = [
        'person_id',
        'code',
        'description',
    ];

    public function company()
    {
        return $this->belongsTo(Person::class, 'person_id', 'id');
    }
}
