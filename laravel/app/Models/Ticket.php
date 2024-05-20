<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'price',
        'user_id',
        'pass_id',
        'movie_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pass()
    {
        return $this->belongsTo(Pass::class);
    }

    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }
}