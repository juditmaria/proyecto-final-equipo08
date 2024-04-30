<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'direction',
        'phone',
        'promoter_id',
        'pass_id',
    ];

    // Relación con el promotor
    public function promoter()
    {
        return $this->belongsTo(Promoter::class);
    }

    // Relación con el pase
    public function pass()
    {
        return $this->belongsTo(Pass::class);
    }
}