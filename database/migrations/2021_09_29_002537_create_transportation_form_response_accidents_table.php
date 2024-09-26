<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransportationFormResponseAccidentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transportation_form_response_accident', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('transportation_form_response_id');
            $table->foreign('transportation_form_response_id', 'tfraccident_transportation_form_response_id')->references('id')->on('transportation_form_response');
            $table->decimal('goods_value', 14, 2);
            $table->decimal('loss_value', 14, 2);
            $table->string('cause');
            $table->date('date');
            $table->string('shippers_involved');
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
        Schema::dropIfExists('transportation_form_response_accident');
    }
}
