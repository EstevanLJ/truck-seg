<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDealTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deal', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pipeline_id');
            $table->foreign('pipeline_id')->references('id')->on('pipeline');
            $table->unsignedBigInteger('pipeline_status_id');
            $table->foreign('pipeline_status_id')->references('id')->on('pipeline_status');
            $table->string('name');
            $table->text('observation')->nullable();
            $table->integer('insurance_type');
            $table->boolean('new_insurance');
            $table->unsignedBigInteger('old_insurance_company_id')->nullable();
            $table->foreign('old_insurance_company_id')->references('id')->on('insurance_company');
            $table->date('limit_date')->nullable();
            $table->decimal('value', 15, 2)->nullable();
            $table->integer('probability')->nullable();
            $table->unsignedBigInteger('owner_id');
            $table->foreign('owner_id')->references('id')->on('users');
            $table->unsignedBigInteger('client_id');
            $table->foreign('client_id')->references('id')->on('person');

            $table->integer('finished_status');
            $table->date('finished_date')->nullable();
            $table->decimal('finished_value', 15, 2)->nullable();
            $table->bigInteger('insurance_company_id')->unsigned()->nullable();
            $table->foreign('insurance_company_id')->references('id')->on('insurance_company');
            $table->bigInteger('deal_lost_reason_id')->unsigned()->nullable();
            $table->foreign('deal_lost_reason_id')->references('id')->on('deal_lost_reason');
            $table->text('finished_observation')->nullable();

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
        Schema::dropIfExists('deal');
    }
}
