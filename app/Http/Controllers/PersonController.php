<?php

namespace App\Http\Controllers;

use App\Models\CompanyActivity;
use App\Models\CompanyEmployee;
use App\Models\Person;
use App\Models\PersonAddress;
use App\Services\PersonService;
use App\Services\ReceitaService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laratrust\LaratrustFacade as Laratrust;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!Laratrust::isAbleTo('people-read')) {
            abort(401);
        }

        $data = Person::orderBy('name')->get();

        return [
            'data' => $data
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!Laratrust::isAbleTo('people-create')) {
            abort(401);
        }

        $validated = $request->validate([
            'type' => 'required|integer',
            'name' => 'required|string',
            'document' => 'required|string',
            'trading_name' => 'nullable|string',
            'contact_name' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'main_activity' => 'nullable|string',
            'main_activity_code' => 'nullable|string',
            'share_capital' => 'nullable|numeric',
            'juridic_nature' => 'nullable|string',
            'antt_register' => 'nullable|string',
            'corporate' => 'nullable|boolean',
            'creation_date' => 'nullable|date',

            'addresses.*.description' => 'required|string',
            'addresses.*.main' => 'required|boolean',
            'addresses.*.address' => 'required|string',
            'addresses.*.number' => 'required|string',
            'addresses.*.complement' => 'nullable|string',
            'addresses.*.district' => 'required|string',
            'addresses.*.city' => 'required|string',
            'addresses.*.state' => 'required|string',
            'addresses.*.zip_code' => 'required|string',

            'employees.*.name' => 'required|string',
            'employees.*.role' => 'required|string',

            'activities.*.code' => 'required|string',
            'activities.*.description' => 'required|string',
        ]);


        try {

            $person = PersonService::store($validated);

        } catch (Exception $e) {
            report($e);
            abort(500);
        }


        return [
            'data' => $person
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Person  $person
     * @return \Illuminate\Http\Response
     */
    public function show(Person $person)
    {
        if (!Laratrust::isAbleTo('people-read')) {
            abort(401);
        }

        $person->load('addresses', 'contacts', 'employees', 'documents', 'activities');

        return [
            'data' => $person
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Person  $person
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Person $person)
    {
        if (!Laratrust::isAbleTo('people-update')) {
            abort(401);
        }

        $validated = $request->validate([
            'type' => 'required|integer',
            'name' => 'required|string',
            'document' => 'required|string',
            'trading_name' => 'nullable|string',
            'contact_name' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'main_activity' => 'nullable|string',
            'main_activity_code' => 'nullable|string',
            'share_capital' => 'nullable|numeric',
            'juridic_nature' => 'nullable|string',
            'antt_register' => 'nullable|string',
            'corporate' => 'nullable|boolean',
            'creation_date' => 'nullable|date',
        ]);

        $person->update($validated);

        return [
            'data' => $person
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Person  $person
     * @return \Illuminate\Http\Response
     */
    public function destroy(Person $person)
    {
        //
    }

    public function searchDocument(Request $request)
    {
        $document = $request->input('document');

        $person = Person::where('document', '=', $document)->first();

        if ($person) {
            $person->load('addresses', 'contacts', 'employees', 'documents', 'activities');
            return [
                'data' => $person
            ];
        }

        try {
            $response = ReceitaService::search($document);

            $employees = [];
            foreach ($response['qsa'] as $socio) {
                $employees[] = [
                    'name' => $socio['nome'],
                    'role' => $socio['qual'],
                ];
            }

            $activities = [];
            if (isset($response['atividades_secundarias']) && $response['atividades_secundarias']) {
                foreach ($response['atividades_secundarias'] as $activity) {
                    $activities[] = [
                        'code' => $activity['code'],
                        'description' => $activity['text'],
                    ];
                }
            }

            $creationDate = implode('-', array_reverse(explode('/', $response['abertura'])));

            $data = [
                'id' => null,
                'type' => "1",
                'document' => $document,
                'name' => $response['nome'] ?? '',
                'trading_name' => $response['fantasia'] ?? '',
                'contact_name' => '',
                'phone' => $response['telefone'] ?? '',
                'email' => $response['email'] ?? '',
                'creation_date' => $creationDate,
                'corporate' => isset($response['tipo']) ? ($response['tipo'] === 'MATRIZ' ? true : false) : '',
                'juridic_nature' => $response['natureza_juridica'] ?? '',
                'share_capital' => $response['capital_social'] ? floatval($response['capital_social']) * 100 : '',
                'main_activity_code' => $response['atividade_principal'][0]['code'] ?? '',
                'main_activity' => $response['atividade_principal'][0]['text'] ?? '',
                'addresses' => [
                    [
                        'description' => 'Principal',
                        'main' => '1',
                        'address' => $response['logradouro'] ?? '',
                        'number' => $response['numero'] ?? '',
                        'complement' => $response['complemento'] ?? '',
                        'district' => $response['bairro'] ?? '',
                        'city' => $response['municipio'] ?? '',
                        'state' => $response['uf'] ?? '',
                        'zip_code' => $response['cep'] ?? '',
                    ]
                ],
                'contacts' => [],
                'employees' => $employees,
                'documents' => [],
                'activities' => $activities,
            ];

            return [
                'data' => $data
            ];
        } catch (Exception $e) {
            report($e);
            abort(500);
        }
    }
}
