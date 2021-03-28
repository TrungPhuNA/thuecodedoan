<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        try{
            \DB::table('admins')->insert([
                'name' => 'TrungPhuNA',
                'email' => 'phupt.humg.94@gmail.com',
                'phone' => '0986420994',
                'password' => \Hash::make('Toilatoi94@')
            ]);
        }catch (\Exception $exception){
            \Log::error("[Seed Admin] ". $exception->getMessage());
        }
    }
}
