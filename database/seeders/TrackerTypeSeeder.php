<?php

namespace Database\Seeders;

use App\Models\TrackerType;
use Illuminate\Database\Seeder;

class TrackerTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
            "AUTOTRAC",
            "RODOSIS",
            "CONTROLLOC",
            "SASCARGA",
            "CONTROLSAT",
            "ITURAN",
            "JABURSAT",
            "OMNILINK",
        ];

        foreach ($types as $type) {
            TrackerType::create([
                'name' => $type,
                'active' => 1
            ]);
        }
    }
}




