<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Country;
use App\Models\State;
use Illuminate\Database\Seeder;

class LocationsSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $filePath = "database/dataFiles/countries.csv";

        if (($handle = fopen($filePath, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                Country::create([
                    'code' => $data[0],
                    'name' => $data[1],
                    'nationality' => $data[2]
                ]);
            }
            fclose($handle);
        }

        $brazil = Country::where('name', '=', 'Brasil')->first();
        $filePath = "database/dataFiles/provinces.csv";

        if (($handle = fopen($filePath, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                State::create([
                    'code' => $data[0],
                    'name' => $data[1],
                    'abbreviation' => $data[2],
                    'country_id' => $brazil->id
                ]);
            }
            fclose($handle);
        }

        $provinces = State::pluck('id', 'abbreviation');
        $filePath = "database/dataFiles/cities.csv";

        if (($handle = fopen($filePath, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                City::create([
                    'code' => $data[1],
                    'name' => $data[3],
                    'state_id' => $provinces[$data[0]] ?? NULL
                ]);
            }
            fclose($handle);
        }
    }
}
