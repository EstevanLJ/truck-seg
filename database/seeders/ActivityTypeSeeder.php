<?php

namespace Database\Seeders;

use App\Models\ActivityType;
use Illuminate\Database\Seeder;

class ActivityTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        ActivityType::create([
            'icon' => 'far fa-phone',
            'name' => 'Call',
            'active' => true,
        ]);

        ActivityType::create([
            'icon' => 'far fa-user',
            'name' => 'Meeting',
            'active' => true,
        ]);

        ActivityType::create([
            'icon' => 'far fa-pennant',
            'name' => 'Activity',
            'active' => true,
        ]);

        ActivityType::create([
            'icon' => 'far fa-clock',
            'name' => 'Deadline',
            'active' => true,
        ]);

        ActivityType::create([
            'icon' => 'far fa-paper-plane',
            'name' => 'E-mail',
            'active' => true,
        ]);

        ActivityType::create([
            'icon' => 'far fa-utensils',
            'name' => 'Lunch',
            'active' => true,
        ]);

    }
}
