<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceDriversTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_drivers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('service_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('driver_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('company_vehicle_id')->constrained()->onDelete('CASCADE');
            $table->string('description')->nullable();
            $table->integer('mileage_start')->nullable();
            $table->integer('mileage_end')->nullable();
            $table->integer('mileage')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('service_drivers');
    }
}
