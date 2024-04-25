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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('direction');
            $table->string('phone');
            $table->unsignedBigInteger('promoter_id');
            $table->unsignedBigInteger('pass_id');
            $table->foreign('promoter_id')->references('id')->on('promoters')->onDelete('cascade');
            $table->foreign('pass_id')->references('id')->on('passes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
