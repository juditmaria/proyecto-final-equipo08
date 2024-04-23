<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pase extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_pase';
    
    protected $fillable = [
        'id_pelicula',
        'id_sala',
        'fecha',
        'hora_inicio',
    ];

    public function pelicula()
    {
        return $this->belongsTo(Pelicula::class, 'id_pelicula');
    }

    public function sala()
    {
        return $this->belongsTo(Sala::class, 'id_sala');
    }
}
