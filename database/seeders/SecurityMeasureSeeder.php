<?php

namespace Database\Seeders;

use App\Models\SecurityMeasure;
use Illuminate\Database\Seeder;

class SecurityMeasureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
            "Rastreamento via satélite com monitoramento",
            "Escolta Armada",
            "Checagem de pontos de paradas",
            "Verificação de Motoristas	",
            "Sistema de Comboio",
        ];

        foreach ($types as $type) {
            SecurityMeasure::create([
                'name' => $type,
                'active' => 1
            ]);
        }
    }
}
