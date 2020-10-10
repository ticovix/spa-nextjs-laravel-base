<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('customer_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('driver_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('service_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('company_user_id')->constrained()->onDelete('CASCADE');
            $table->string('description')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('street')->nullable();
            $table->string('number')->nullable();
            $table->string('reference')->nullable();
            $table->string('complement')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('district')->nullable();
            $table->integer('main')->default(0);
            $table->integer('local')->nullable();
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
        Schema::dropIfExists('addresses');
    }
}
