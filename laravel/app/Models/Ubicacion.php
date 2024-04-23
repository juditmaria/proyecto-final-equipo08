<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ubicacion extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ubicaciones';

    protected $fillable = [
        'nombre',
        'direccion',
        'telefono',
        'id_promotor',
        'id_pase',
    ];

    /**
     * Obtener el promotor asociado a la ubicación.
     */
    public function promotor()
    {
        return $this->belongsTo(Promotor::class, 'id_promotor');
    }

    /**
     * Obtener el pase asociado a la ubicación.
     */
    public function pase()
    {
        return $this->belongsTo(Pase::class, 'id_pase');
    }
}
