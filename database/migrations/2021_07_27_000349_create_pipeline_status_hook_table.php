<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePipelineStatusHookTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pipeline_status_hook', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pipeline_status_id');
            $table->foreign('pipeline_status_id')->references('id')->on('pipeline_status');
            $table->string('type');
            $table->string('hook');
            $table->integer('order');
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
        Schema::dropIfExists('pipeline_status_hook');
    }
}
