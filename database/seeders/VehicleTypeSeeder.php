<?php

namespace Database\Seeders;

use App\Models\VehicleType;
use Illuminate\Database\Seeder;

class VehicleTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
            "Motos",
            "Furgões",
            "Kombis",
            "Frigoríficos",
            "Pick Up",
            "Automóveis",
            "Caminhões Abertos",
            "Caminhões Fechados",
        ];

        foreach ($types as $type) {
            VehicleType::create([
                'name' => $type,
                'active' => 1
            ]);
        }
    }
}
