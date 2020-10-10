<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('company_user_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('service_type_id')->constrained();
            $table->text('description')->nullable();
            $table->decimal('coast_value', 10, 2)->nullable();
            $table->decimal('value', 10, 2)->nullable();
            $table->decimal('closed_value', 10, 2)->nullable();
            $table->integer('status');
            $table->tinyInteger('contractor_type');
            $table->dateTime('received_at');
            $table->dateTime('scheduled_to')->nullable();
            $table->integer('total_mileage');
            $table->integer('closed_mileage');
            $table->timestamps();
            $table->softDeletes();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('services');
    }
}
