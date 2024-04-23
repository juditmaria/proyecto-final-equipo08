<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sala extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_sala';
    
    protected $fillable = [
        'nombre',
        'capacidad',
        'num_fila',
        'num_asiento',
        'hora',
    ];
}
