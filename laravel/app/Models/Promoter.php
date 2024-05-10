<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promoter extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id',
        'image', // Agregar el campo 'image' al array fillable
    ];

    // Relación con el usuario (opcional, dependiendo de tu lógica de negocio)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
