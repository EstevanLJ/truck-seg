<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $table = 'country';

    protected $fillable = ['code', 'name', 'nationality'];

    public function states()
    {
        return $this->hasMany(State::class, 'country_id', 'id');
    }
}
