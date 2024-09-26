<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('person', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('type');
            $table->string('name');
            $table->string('document', 14)->unique(); //CPF ou CNPJ
            $table->string('trading_name')->nullable(); //Razao Social
            $table->string('contact_name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('main_activity')->nullable();
            $table->string('main_activity_code')->nullable();
            $table->decimal('share_capital', 14, 2)->nullable(); //Capital Social
            $table->string('juridic_nature')->nullable(); //Natureza Jurídica
            $table->boolean('corporate')->default(true); //Matriz ou filial
            $table->date('creation_date')->nullable(); //Nascimento ou fundação
            $table->string('antt_register')->nullable(); //Registro ANTT
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
        Schema::dropIfExists('person');
    }
}
