<?php

namespace Database\Seeders;

use App\Models\CompanyEmployee;
use App\Models\Person;
use App\Models\PersonAddress;
use Illuminate\Database\Seeder;

class PersonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create('en_US');

        for ($i = 0; $i < 30; $i++) {
            $tipo = rand(0, 1);

            if ($tipo) {
                $person = Person::create([
                    'type' => Person::TYPE_PERSON,
                    'name' => $faker->name,
                    'document' => $this->cpfRandom($mascara = "0"),
                    'email' => $faker->email,
                    'phone' => $faker->phoneNumber,
                    'creation_date' => $faker->date('Y-m-d', 'now'),
                ]);
            } else {
                $companyName = $faker->company;
                $person =  Person::create([
                    'type' => Person::TYPE_COMPANY,
                    'name' => $companyName . ' ' . $faker->companySuffix,
                    'trading_name' => $companyName,
                    'document' => $this->cnpjRandom($mascara = "0"),
                    'contact_name' => $faker->name,
                    'email' => $faker->email,
                    'phone' => $faker->phoneNumber,
                    'creation_date' => $faker->date('Y-m-d', 'now'),
                ]);

                $employees = rand(1,2);
                for ($j = 0; $j < $employees; $j++) {
                    CompanyEmployee::create([
                        'person_id' => $person->id,
                        'name' => $faker->name,
                        'role' => $faker->jobTitle,
                        'email' => $faker->email,
                        'phone' => $faker->phoneNumber,
                        'secondary_phone' => $faker->phoneNumber,
                        'has_whatsapp' => rand(0,100) > 80
                    ]);
                }

            }

            $addresses = rand(1,2);
            for ($j = 0; $j < $addresses; $j++) {
                PersonAddress::create([
                    'person_id' => $person->id,
                    'main' => $j == 0,
                    'description' => $j == 0 ? 'Principal' : 'Secundário',
                    'person_id' => $person->id,
                    'zip_code' => $this->randomDigits(8),
                    'address' => $faker->streetName,
                    'number' => $faker->buildingNumber,
                    'complement' => $faker->secondaryAddress,
                    'district' => $faker->cityPrefix,
                    'city' => $faker->city,
                    'state' => $faker->stateAbbr,
                ]);
            }


        }
    }


    private function randomDigits($digits)
    {
        $out = '';

        for ($i = 0; $i < $digits; $i++) {
            $out .= strval(rand(0, 9));
        }

        return $out;
    }

    /**
     * Método para gerar CNPJ válido, com máscara ou não
     * @example cnpjRandom(0)
     *          para retornar CNPJ sem máscar
     * @param int $mascara
     * @return string
     */
    private function cnpjRandom($mascara = "1")
    {
        $n1 = rand(0, 9);
        $n2 = rand(0, 9);
        $n3 = rand(0, 9);
        $n4 = rand(0, 9);
        $n5 = rand(0, 9);
        $n6 = rand(0, 9);
        $n7 = rand(0, 9);
        $n8 = rand(0, 9);
        $n9 = 0;
        $n10 = 0;
        $n11 = 0;
        $n12 = 1;
        $d1 = $n12 * 2 + $n11 * 3 + $n10 * 4 + $n9 * 5 + $n8 * 6 + $n7 * 7 + $n6 * 8 + $n5 * 9 + $n4 * 2 + $n3 * 3 + $n2 * 4 + $n1 * 5;
        $d1 = 11 - ($this->mod($d1, 11));
        if ($d1 >= 10) {
            $d1 = 0;
        }
        $d2 = $d1 * 2 + $n12 * 3 + $n11 * 4 + $n10 * 5 + $n9 * 6 + $n8 * 7 + $n7 * 8 + $n6 * 9 + $n5 * 2 + $n4 * 3 + $n3 * 4 + $n2 * 5 + $n1 * 6;
        $d2 = 11 - ($this->mod($d2, 11));
        if ($d2 >= 10) {
            $d2 = 0;
        }
        $retorno = '';
        if ($mascara == 1) {
            $retorno = '' . $n1 . $n2 . "." . $n3 . $n4 . $n5 . "." . $n6 . $n7 . $n8 . "/" . $n9 . $n10 . $n11 . $n12 . "-" . $d1 . $d2;
        } else {
            $retorno = '' . $n1 . $n2 . $n3 . $n4 . $n5 . $n6 . $n7 . $n8 . $n9 . $n10 . $n11 . $n12 . $d1 . $d2;
        }
        return $retorno;
    }

    /**
     * Método para gerar CPF válido, com máscara ou não
     * @example cpfRandom(0)
     *          para retornar CPF sem máscar
     * @param int $mascara
     * @return string
     */
    public function cpfRandom($mascara = "1")
    {
        $n1 = rand(0, 9);
        $n2 = rand(0, 9);
        $n3 = rand(0, 9);
        $n4 = rand(0, 9);
        $n5 = rand(0, 9);
        $n6 = rand(0, 9);
        $n7 = rand(0, 9);
        $n8 = rand(0, 9);
        $n9 = rand(0, 9);
        $d1 = $n9 * 2 + $n8 * 3 + $n7 * 4 + $n6 * 5 + $n5 * 6 + $n4 * 7 + $n3 * 8 + $n2 * 9 + $n1 * 10;
        $d1 = 11 - ($this->mod($d1, 11));
        if ($d1 >= 10) {
            $d1 = 0;
        }
        $d2 = $d1 * 2 + $n9 * 3 + $n8 * 4 + $n7 * 5 + $n6 * 6 + $n5 * 7 + $n4 * 8 + $n3 * 9 + $n2 * 10 + $n1 * 11;
        $d2 = 11 - ($this->mod($d2, 11));
        if ($d2 >= 10) {
            $d2 = 0;
        }
        $retorno = '';
        if ($mascara == 1) {
            $retorno = '' . $n1 . $n2 . $n3 . "." . $n4 . $n5 . $n6 . "." . $n7 . $n8 . $n9 . "-" . $d1 . $d2;
        } else {
            $retorno = '' . $n1 . $n2 . $n3 . $n4 . $n5 . $n6 . $n7 . $n8 . $n9 . $d1 . $d2;
        }
        return $retorno;
    }

    /**
     * @param type $dividendo
     * @param type $divisor
     * @return type
     */
    private function mod($dividendo, $divisor)
    {
        return round($dividendo - (floor($dividendo / $divisor) * $divisor));
    }
}
