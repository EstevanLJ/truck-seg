<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransportationFormResponseGoodsTypeOthersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transportation_form_response_goods_type_other', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('transportation_form_response_id');
            $table->foreign('transportation_form_response_id', 'tfrgto_transportation_form_response_id')->references('id')->on('transportation_form_response');
            $table->string('goods_type');
            $table->integer('percent');
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
        Schema::dropIfExists('transportation_form_response_goods_type_other');
    }
}
