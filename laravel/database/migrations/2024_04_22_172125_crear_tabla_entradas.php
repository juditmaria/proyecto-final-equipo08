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
        Schema::create('entradas', function (Blueprint $table) {
            $table->id('id_entrada');
            $table->decimal('precio', 8, 2);
            $table->unsignedBigInteger('id_usuario');
            $table->unsignedBigInteger('id_pase');
            $table->unsignedBigInteger('id_pelicula');
            $table->foreign('id_usuario')->references('id_usuario')->on('usuarios')->onDelete('cascade');
            $table->foreign('id_pase')->references('id_horario')->on('pases')->onDelete('cascade');
            $table->foreign('id_pelicula')->references('id_pelicula')->on('peliculas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entradas');
    }
};
