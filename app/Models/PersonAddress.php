<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonAddress extends Model
{
    use HasFactory;

    protected $table = 'person_address';

    protected $fillable = [
        'person_id',
        'description',
        'main',
        'address',
        'number',
        'complement',
        'district',
        'city',
        'state',
        'zip_code',
    ];

    protected $casts = [
        'main' => 'bool'
    ];

    public function person()
    {
        return $this->belongsTo(Person::class, 'person_id', 'id');
    }
}
