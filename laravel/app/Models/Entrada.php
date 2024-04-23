<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entrada extends Model
{
    use HasFactory;

    protected $fillable = [
        'precio',
        'id_usuario',
        'id_pase',
        'id_pelicula',
    ];

    /**
     * Obtener el usuario asociado a la entrada.
     */
    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }

    /**
     * Obtener el pase asociado a la entrada.
     */
    public function pase()
    {
        return $this->belongsTo(Pase::class, 'id_pase');
    }

    /**
     * Obtener la película asociada a la entrada.
     */
    public function pelicula()
    {
        return $this->belongsTo(Pelicula::class, 'id_pelicula');
    }
}
