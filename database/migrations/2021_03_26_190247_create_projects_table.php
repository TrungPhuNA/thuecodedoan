<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('p_name')->nullable();
            $table->string('p_slug')->nullable();
            $table->string('p_fullname')->nullable();
            $table->string('p_facebook')->nullable();
            $table->string('p_university')->nullable();
            $table->string('p_language_code')->nullable();
            $table->string('p_csdl')->nullable();
            $table->integer('p_price')->default(0);
            $table->integer('p_deposit')->default(0);
            $table->date('p_time_start')->nullable();
            $table->date('p_time_stop')->nullable();
            $table->string('p_document')->nullable();
            $table->string('p_website')->nullable();
            $table->text('p_content')->nullable();
            $table->tinyInteger('p_status')->default(1);
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
        Schema::dropIfExists('projects');
    }
}
