<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Valoracion extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'valoraciones';

    protected $fillable = [
        'estrellas',
        'comentario',
        'id_usuario',
        'id_pelicula',
    ];

    /**
     * Obtener el usuario asociado a la valoración.
     */
    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }

    /**
     * Obtener la película asociada a la valoración.
     */
    public function pelicula()
    {
        return $this->belongsTo(Pelicula::class, 'id_pelicula');
    }
}
