<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransportationFormResponseValuesHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transportation_form_response_values_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('transportation_form_response_id');
            $table->foreign('transportation_form_response_id', 'tfrvh_transportation_form_response_id')->references('id')->on('transportation_form_response');
            $table->string('month_year');
            $table->decimal('value', 14, 2);
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
        Schema::dropIfExists('transportation_form_response_values_history');
    }
}
