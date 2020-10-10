<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('customer_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('driver_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('service_id')->constrained()->onDelete('CASCADE');
            $table->foreignId('company_user_id')->constrained()->onDelete('CASCADE');
            $table->tinyInteger('type');
            $table->string('description');
            $table->integer('status');
            $table->text('old');
            $table->text('new');
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
        Schema::dropIfExists('histories');
    }
}
