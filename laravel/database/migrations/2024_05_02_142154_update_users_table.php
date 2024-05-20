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
        // Update users table
        Schema::table('users', function (Blueprint $table) {
            // Add role column
            $table->unsignedBigInteger('role')
                  ->default(0);
        });

        // Update old users with default role
        DB::table('users')
            ->whereNull('role')
            ->update(['role' => 0]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //down() in migration create_user_table
    }
};
