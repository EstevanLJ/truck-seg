<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransportationFormResponseTrackersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transportation_form_response_tracker', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('transportation_form_response_id');
            $table->foreign('transportation_form_response_id', 'tfrt_transportation_form_response_id')->references('id')->on('transportation_form_response');
            $table->unsignedBigInteger('tracker_type_id');
            $table->foreign('tracker_type_id')->references('id')->on('tracker_type');
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
        Schema::dropIfExists('transportation_form_response_tracker');
    }
}
