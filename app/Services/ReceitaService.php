<?php

namespace App\Services;

use App\Models\ReceitaWSRequest;
use Exception;
use Illuminate\Support\Facades\Http;

class ReceitaService
{
    public static function search(string $cnpj, int $days = NULL)
    {
        $cache = ReceitaWSRequest::where('cnpj', '=', $cnpj)
            ->first();

        if ($cache) {
            return json_decode($cache->response, TRUE);
        }

        $url = config('api_receita.url');
        $url = str_replace('[cnpj]', $cnpj, $url);

        if ($days) {
            $url = $url . "/days/{$days}";
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('api_receita.token'),
        ])->get($url);

        if (!$response->successful()) {
            throw new Exception('Falha ao buscar CNPJ');
        }

        $json = $response->json();

        if ($json['status'] != 'OK') {
            throw new Exception('Falha ao buscar CNPJ: ' . $json['message']);
        }

        ReceitaWSRequest::create([
            'cnpj' => $cnpj,
            'days' => $days,
            'response' => json_encode($json)
        ]);

        return $json;
    }
}
