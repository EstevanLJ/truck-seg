<?php

namespace Database\Seeders;

use App\Models\SensorType;
use Illuminate\Database\Seeder;

class SensorTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
            "Proteção da antena",
            "Carona",
            "Desengate",
            "Ignição",
            "Velocidade",
            "Botão de pânico",
            "Da porta do baú",
        ];

        foreach ($types as $type) {
            SensorType::create([
                'name' => $type,
                'active' => 1
            ]);
        }
    }
}


