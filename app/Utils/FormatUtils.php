<?php

namespace App\Utils;

class FormatUtils
{
    public static function formatCnpj($cnpj)
    {
        $completeCnpj = sprintf("%014s", $cnpj);
        return preg_replace("/([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/", "$1.$2.$3/$4-$5", $completeCnpj);
    }

    public static function formatCpf($cpf)
    {
        $completeCpf = sprintf("%011s", $cpf);
        return preg_replace("/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/", "$1.$2.$3-$4", $completeCpf);
    }
}
