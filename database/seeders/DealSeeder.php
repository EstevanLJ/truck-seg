<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\ActivityType;
use App\Models\Deal;
use App\Models\DealActivity;
use App\Models\DealHistory;
use App\Models\DealSatusChange;
use App\Models\DealStatusChange;
use App\Models\InsuranceCompany;
use App\Models\Person;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DealSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create('pt_BR');

        $clients = Person::all();
        $users = User::all();
        $activityTypes = ActivityType::all();
        $insuranceCompanies = InsuranceCompany::all();

        for ($i = 0; $i < 30; $i++) {
            $client = $clients->random();
            $owner = $users->random();
            $start = $faker->dateTimeBetween('-90 days', 'now');
            $new_insurance = rand(0,100) > 70;

            if ($new_insurance) {
                $old_insurance_company_id = $insuranceCompanies->random()->id;
                $limit_date = $faker->dateTimeBetween('now', '+90 days');
            } else {
                $old_insurance_company_id = NULL;
                $limit_date = NULL;
            }

            $deal = Deal::create([
                'pipeline_id' => 1,
                'pipeline_status_id' => 1,
                'name' => 'Deal ' . $client->name,
                'value' => NULL,
                'insurance_type' => rand(0,100) > 70 ? 0 : 1,
                'new_insurance' => $new_insurance,
                'old_insurance_company_id' => $old_insurance_company_id,
                'probability' => rand(1,10) * 10,
                'observation' => $faker->paragraph,
                'limit_date' => $limit_date,
                'client_id' => $client->id,
                'owner_id' => $owner->id,
                'finished_status' => Deal::FINISHED_STATUS_OPEN
            ]);

            $deal->created_at = $start;
            $deal->save();

            $dealHistory = DealHistory::create([
                'deal_id' => $deal->id,
                'user_id' => $owner->id,
                'event_type' => DealHistory::CREATION,
                'description' => 'Deal created'
            ]);
            $dealHistory->created_at = $start;
            $dealHistory->save();

            DealStatusChange::create([
                'deal_id' => $deal->id,
                'user_id' => $owner->id,
                'start' => $start,
                'pipeline_status_id' => $deal->pipeline_status_id,
            ]);

            $activities = rand(1,3);
            for ($j = 0; $j < $activities; $j++) {
                $activityType = $activityTypes->random();
                $activity = Activity::create([
                    'activity_type_id' => $activityType->id,
                    'title' => $faker->sentence(6, true),
                    'description' => $faker->paragraph,
                    'date' => $faker->dateTimeBetween('now', '+90 days'),
                    'time_from' => $faker->time('H:i:s'),
                    'done_at' => NULL,
                    'assigned_to' => $owner->id,
                    'done_by' => NULL
                ]);

                DealActivity::create([
                    'deal_id' => $deal->id,
                    'activity_id' => $activity->id,
                ]);
            }
        }

    }
}
