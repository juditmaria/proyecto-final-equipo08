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

    public function diskSave($image)
    {
        $fileName = $image->getClientOriginalName();
        
        // Store file at disk
        $uploadName = time() . '_' . $fileName;
        $filePath = $image->storeAs(
            'public/uploads', // Path
            $uploadName       // Filename
        );
        
        $stored = Storage::exists($filePath);

        if ($stored) {
            // Update model properties
            $this->image = $filePath;
            $this->save();
            return true;
        } else {
            return false;
        }
    }

    // Relación con el usuario (opcional, dependiendo de tu lógica de negocio)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
