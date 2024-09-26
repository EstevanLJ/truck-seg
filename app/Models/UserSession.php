<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSession extends Model
{
    use HasFactory;

    protected $table = 'user_session';

    protected $fillable = ['user_agent', 'ip_address', 'user_id', 'email'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
