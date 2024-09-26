<?php

namespace Database\Seeders;

use App\Models\DealLostReason;
use Illuminate\Database\Seeder;

class DealLostReasonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DealLostReason::create([
            'name' => 'Price too high',
        ]);

        DealLostReason::create([
            'name' => 'Competitor had a better offer',
        ]);

        DealLostReason::create([
            'name' => 'Customer gave up hiring the service',
        ]);

        DealLostReason::create([
            'name' => 'Unknown reason',
        ]);
    }
}
