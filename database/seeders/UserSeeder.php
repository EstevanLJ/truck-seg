<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $adminUser = User::create([
            'name' => 'Admin',
            'email' => 'admin@truck-seg.com.br',
            'password' => Hash::make('admin')
        ]);

        $adminRole = Role::where('name', '=', 'administrator')->first();

        $adminUser->attachRole($adminRole);

        User::factory(3)->create();
    }
}
