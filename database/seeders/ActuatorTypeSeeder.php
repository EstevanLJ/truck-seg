<?php

namespace Database\Seeders;

use App\Models\ActuatorType;
use Illuminate\Database\Seeder;

class ActuatorTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
            "transporter" => [
                "Sirene",
                "Bloqueia veículo",
                "Trava do baú",
                "Teclado",
                "Trava de 5º roda",
            ],

            "shipper" => [
                "Corte de Combustível",
                "Bloqueio de Ignição",
                "Trava de Baú",
                "Cerca Eletrônica",
                "Escuta na Cabina",
                "Sensor de Desengate da Carreta",
                "Sensor de Porta de Cabine",
                "Sirene",
                "Botão de Pânico",
            ],
        ];

        foreach ($types as $formType => $types) {
            foreach ($types as $type) {
                ActuatorType::create([
                    'form_type' => $formType,
                    'name' => $type,
                    'active' => 1
                ]);
            }
        }
    }
}




