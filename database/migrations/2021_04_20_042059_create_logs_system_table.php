<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLogsSystemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('logs_system', function (Blueprint $table) {
            $table->id();
            $table->string('ls_ip')->nullable();
            $table->string('ls_app_name')->nullable();
            $table->string('ls_line')->nullable();
            $table->string('ls_file')->nullable();
            $table->text('ls_content')->nullable();
            $table->mediumText('ls_browser')->nullable();
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
        Schema::dropIfExists('logs_system');
    }
}
