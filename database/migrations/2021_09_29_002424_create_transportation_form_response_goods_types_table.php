<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransportationFormResponseGoodsTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transportation_form_response_goods_types', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('transportation_form_response_id');
            $table->foreign('transportation_form_response_id', 'tfrgt_transportation_form_response_id')->references('id')->on('transportation_form_response');
            $table->unsignedBigInteger('goods_type_id');
            $table->foreign('goods_type_id', 'tfrgt_goods_type_id')->references('id')->on('goods_type');
            $table->integer('packages');
            $table->integer('percent');
            $table->integer('maximum_limit');
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
        Schema::dropIfExists('transportation_form_response_goods_types');
    }
}
