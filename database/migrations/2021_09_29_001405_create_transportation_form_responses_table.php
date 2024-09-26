<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransportationFormResponsesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transportation_form_response', function (Blueprint $table) {
            $table->id();

            $table->string('type', 20);
            $table->unsignedBigInteger('quotation_id');
            $table->foreign('quotation_id')->references('id')->on('quotation');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('version');
            $table->boolean('urban_route');
            $table->boolean('fluvial_route');
            $table->decimal('next_12_months_movment_forecast', 14, 2);
            $table->decimal('average_trip_value', 14, 2);
            $table->decimal('maximum_trip_value', 14, 2);
            $table->integer('average_trips_month');
            $table->decimal('intended_limit_rctr_c', 14, 2);
            $table->decimal('intended_limit_rcf_dc', 14, 2);
            $table->integer('fractioned_composition');
            $table->integer('closed_composition');
            $table->boolean('has_tracking_system');
            $table->boolean('has_tracking_company');
            $table->string('tracking_company');
            $table->string('tracking_company_contact');
            $table->string('tracking_company_phone');
            $table->string('current_insurance_company');
            $table->date('due_date');
            $table->string('discounts');
            $table->text('observations');
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
        Schema::dropIfExists('transportation_form_response');
    }
}
