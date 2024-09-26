<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonContact extends Model
{
    use HasFactory;

    protected $table = 'person_contact';

    protected $fillable = [
        'person_id',
        'type',
        'value',
    ];

    public const ARRAY_TYPES = '0,1,2,3,4,5';
    public const TYPE_PHONE = 0;
    public const TYPE_EMAIL = 1;
    public const TYPE_FACEBOOK = 2;
    public const TYPE_INSTAGRAM = 3;
    public const TYPE_TWITTER = 4;
    public const TYPE_SKYPE = 5;
    public const TYPES = [
        'Telefone', 'E-mail', 'Facebook', 'Instagram', 'Twitter', 'Skype'
    ];

    protected $appends = [
        'type_description'
    ];

    public function getTypeDescriptionAttribute()
    {
        return self::TYPES[$this->type];
    }

    public function person()
    {
        return $this->belongsTo(Person::class, 'person_id', 'id');
    }
}
