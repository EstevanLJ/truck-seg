<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransportationFormResponseShippersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transportation_form_response_shipper', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('transportation_form_response_id');
            $table->foreign('transportation_form_response_id', 'tfrs_transportation_form_response_id')->references('id')->on('transportation_form_response');
            $table->string('shipper_name');
            $table->string('document');
            $table->boolean('has_ddr');
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
        Schema::dropIfExists('transportation_form_response_shipper');
    }
}
