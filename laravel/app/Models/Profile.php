<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'image', // Asegúrate de incluir el campo image en $fillable
    ];

/*     public function user()
    {
        return $this->belongsTo(User::class);
    } */

    /**
     * Save the image to disk and return the path.
     */
    public function diskSave(UploadedFile $image)
    {
        $fileName = $image->getClientOriginalName();
        $fileSize = $image->getSize();
        
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
