<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laratrust\Traits\LaratrustUserTrait;
use Illuminate\Database\Eloquent\SoftDeletes;
class User extends Authenticatable
{
    use LaratrustUserTrait;
    use HasFactory, Notifiable;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [
        'roles_name', 'last_session'
    ];

    public function sessions()
    {
        return $this->hasMany(UserSession::class, 'user_id', 'id');
    }

    public function getLastSessionAttribute()
    {
        return $this->sessions()->orderBy('created_at', 'desc')->first();
    }

    public function getRolesNameAttribute()
    {
        $roles = $this->roles->map(function ($role) {
            return $role->display_name;
        })->all();

        if ($roles) {
            return implode(', ', $roles);
        }

    }
}
