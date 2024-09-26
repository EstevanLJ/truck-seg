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
        $this->call(LaratrustSeeder::class);
        // $this->call(LocationsSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(PipelineSeeder::class);
        $this->call(DealLostReasonSeeder::class);
        $this->call(InsuranceCompanySeeder::class);
        $this->call(ActivityTypeSeeder::class);
        $this->call(QuotationTypeSeeder::class);

        $this->call(GoodsTypeSeeder::class);
        $this->call(SensorTypeSeeder::class);
        $this->call(TrackerTypeSeeder::class);
        $this->call(ActuatorTypeSeeder::class);
        $this->call(VehicleTypeSeeder::class);
        $this->call(SecurityMeasureSeeder::class);

        $this->call(PersonSeeder::class);
        $this->call(DealSeeder::class);
    }
}
