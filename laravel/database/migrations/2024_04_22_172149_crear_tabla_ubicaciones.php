<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ubicaciones', function (Blueprint $table) {
            $table->id('id_ubicacion');
            $table->string('nombre');
            $table->string('direccion');
            $table->string('telefono'); // Cambiado a string
            $table->unsignedBigInteger('id_promotor');
            $table->unsignedBigInteger('id_pase');
            $table->foreign('id_promotor')->references('id_promotor')->on('promotores')->onDelete('cascade');
            $table->foreign('id_pase')->references('id_horario')->on('pases')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ubicaciones');
    }
};
