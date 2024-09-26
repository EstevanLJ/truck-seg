<?php

namespace App\Services;

use App\Models\CompanyActivity;
use App\Models\CompanyEmployee;
use App\Models\Person;
use App\Models\PersonAddress;
use Exception;
use Illuminate\Support\Facades\DB;

class PersonService
{

    public static function store(array $validated)
    {

        try {

            DB::beginTransaction();

            $id = $validated['id'] ?? NULL;
            $document = $validated['document'] ?? NULL;
            $newPerson = false;

            if ($id) {
                $person = Person::findOrFail($id);
            } else if ($document) {
                $person = Person::where('document', '=', $document)->first();

                if (!$person) {
                    $person = new Person;
                    $newPerson = true;
                }
            } else {
                $person = new Person;
                $newPerson = true;
            }

            $person->fill($validated);
            $person->save();

            if ($newPerson) {
                if (isset($validated['addresses']) && sizeof($validated['addresses']) > 0) {
                    foreach ($validated['addresses'] as $address) {
                        $address['person_id'] = $person->id;
                        PersonAddress::create($address);
                    }
                }

                if (isset($validated['employees']) && sizeof($validated['employees']) > 0) {
                    foreach ($validated['employees'] as $employee) {
                        $employee['person_id'] = $person->id;
                        CompanyEmployee::create($employee);
                    }
                }

                if (isset($validated['activities']) && sizeof($validated['activities']) > 0) {
                    foreach ($validated['activities'] as $activity) {
                        $activity['person_id'] = $person->id;
                        CompanyActivity::create($activity);
                    }
                }
            }

            DB::commit();

            return $person;
        } catch (Exception $e) {
            DB::rollback();

            throw $e;
        }
    }
}
