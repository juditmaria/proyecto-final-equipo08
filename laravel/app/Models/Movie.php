<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'director',
        'length',
        'type',
        'release_year',
        'trailer',
        'image', // Asegúrate de incluir el campo image en $fillable
    ];

    /**
     * Save the image to disk and return the path.
     */
    public function diskSave(UploadedFile $image)
    {
        $fileName = $image->getClientOriginalName();
        $fileSize = $image->getSize();
        Log::debug("Storing file '{$fileName}' ($fileSize)...");
        
        // Store file at disk
        $uploadName = time() . '_' . $fileName;
        $filePath = $image->storeAs(
            'public/uploads', // Path
            $uploadName       // Filename
        );
        
        $stored = Storage::exists($filePath);

        if ($stored) {
            Log::debug("Disk storage OK");
            $fullPath = Storage::url($filePath);
            Log::debug("File saved at {$fullPath}");
            // Update model properties
            $this->image = $filePath;
            $this->save();
            Log::debug("DB storage OK");
            return true;
        } else {
            Log::debug("Disk storage FAILS");
            return false;
        }
    }
}
