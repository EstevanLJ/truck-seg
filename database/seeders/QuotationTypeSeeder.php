<?php

namespace Database\Seeders;

use App\Models\QuotationType;
use Illuminate\Database\Seeder;

class QuotationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        QuotationType::create([
            'icon' => 'far fa-truck-moving',
            'name' => 'Carga',
            'active' => true,
        ]);
    }
}
