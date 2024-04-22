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
        Schema::create('pases', function (Blueprint $table) {
            $table->id('id_horario');
            $table->unsignedBigInteger('id_pelicula');
            $table->unsignedBigInteger('id_sala');
            $table->date('fecha');
            $table->string('hora_inicio');
            $table->foreign('id_pelicula')->references('id_pelicula')->on('peliculas')->onDelete('cascade');
            $table->foreign('id_sala')->references('id_sala')->on('salas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pases');
    }
};
