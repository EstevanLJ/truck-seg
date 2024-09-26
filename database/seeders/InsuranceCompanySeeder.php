<?php

namespace Database\Seeders;

use App\Models\InsuranceCompany;
use Illuminate\Database\Seeder;

class InsuranceCompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $companies = [
            [
                'abbreviation' => 'SUL AM',
                'name' => 'SUL AM',
                'quotation_time' => 30,
            ], [
                'abbreviation' => 'MAPFRE',
                'name' => 'MAPFRE',
                'quotation_time' => 30,
            ], [
                'abbreviation' => 'MITSUI',
                'name' => 'MITSUI',
                'quotation_time' => 45,
            ], [
                'abbreviation' => 'SOMPO',
                'name' => 'SOMPO',
                'quotation_time' => 60,
            ], [
                'abbreviation' => 'ALLIANZ',
                'name' => 'ALLIANZ',
                'quotation_time' => 30,
            ], [
                'abbreviation' => 'ZURICH',
                'name' => 'ZURICH',
                'quotation_time' => 30,
            ], [
                'abbreviation' => 'TOKIO',
                'name' => 'TOKIO',
                'quotation_time' => 30,
            ], [
                'abbreviation' => 'GENERALI',
                'name' => 'GENERALI',
                'quotation_time' => 30,
            ], [
                'abbreviation' => 'BRADESCO',
                'name' => 'BRADESCO',
                'quotation_time' => 30,
            ], [
                'abbreviation' => 'LIBERTY',
                'name' => 'LIBERTY',
                'quotation_time' => 30,
            ], [
                'abbreviation' => 'PORTO S.',
                'name' => 'PORTO S.',
                'quotation_time' => 30,
            ], [
                'abbreviation' => 'HDI',
                'name' => 'HDI',
                'quotation_time' => 30,
            ], [
                'abbreviation' => 'SURA',
                'name' => 'SURA',
                'quotation_time' => 30,
            ], [
                'abbreviation' => 'GENTE',
                'name' => 'GENTE',
                'quotation_time' => 30,
            ], [
                'abbreviation' => 'ALFA',
                'name' => 'ALFA',
                'quotation_time' => 30,
            ]
        ];

        foreach ($companies as $company) {
            InsuranceCompany::create($company);
        }
    }
}
