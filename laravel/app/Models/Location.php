<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'direction',
        'phone',
        'promoter_id',
        'pass_id',
        'image', // Añadimos el campo de la imagen
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

    /**
     * Save the image to disk and return the path.
     */
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
}
