<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReceitaWSRequest extends Model
{
    use HasFactory;

    protected $table = 'receita_ws_request';

    protected $fillable = ['cnpj', 'days', 'response'];
}
