<?php

if (!function_exists('dateBr2Sql')) {
    function dateBr2Sql($date)
    {
        if (empty($date)) {
            return null;
        }

        $formatInput = 'd/m/Y';
        $formatOutput = 'Y-m-d';
        if (substr_count($date, ':') == 2) {
            $formatInput = 'd/m/Y H:i:s';
            $formatOutput = 'Y-m-d H:i:s';
        }

        $prepareDate = DateTime::createFromFormat($formatInput, $date);
        return $prepareDate->format($formatOutput);
    }
}

if (!function_exists('dateSql2Br')) {
    function dateSql2Br($date)
    {
        if (empty($date)) {
            return false;
        }

        $formatInput = 'Y-m-d';
        $formatOutput = 'd/m/Y';
        if (substr_count($date, ':') == 2) {
            $formatInput = 'Y-m-d H:i:s';
            $formatOutput = 'd/m/Y H:i:s';
        }

        $prepareDate = DateTime::createFromFormat($formatInput, $date);

        return $prepareDate->format($formatOutput);
    }
}

if (!function_exists('currencyBrl2Float')) {
    function currencyBrl2Float($value): float
    {
        return (float)str_replace(",", ".", str_replace(".", "", $value));
    }
}

if (!function_exists('currencyFloat2Brl')) {
    function currencyFloat2Brl($value): string
    {
        return number_format($value, 2, ",", ".");
    }
}

if (!function_exists('getOnlyNumber')) {
    function getOnlyNumber($value)
    {
        return preg_replace('/\D/', '', $value);
    }
}

if (!function_exists('getOnlyPhone')) {
    function getOnlyPhone($value)
    {
        return preg_replace('/^([0-9]{2})/', '', getOnlyNumber($value));
    }
}

if (!function_exists('getOnlyDdd')) {
    function getOnlyDdd($value)
    {
        return preg_replace('/^([0-9]{2}).*/', '$1', getOnlyNumber($value));
    }
}

if (!function_exists('removeAccents')) {
    function removeAccents($value)
    {
        return preg_replace(array("/(á|à|ã|â|ä)/", "/(Á|À|Ã|Â|Ä)/", "/(é|è|ê|ë)/", "/(É|È|Ê|Ë)/", "/(í|ì|î|ï)/", "/(Í|Ì|Î|Ï)/", "/(ó|ò|õ|ô|ö)/", "/(Ó|Ò|Õ|Ô|Ö)/", "/(ú|ù|û|ü)/", "/(Ú|Ù|Û|Ü)/", "/(ñ)/", "/(Ñ)/"), explode(" ", "a A e E i I o O u U n N"), $value);
    }
}
if (!function_exists('removeSpecial')) {
    function removeSpecial($value)
    {
        return preg_replace('/[^a-z0-9]/i', ' ', removeAccents($value));
    }
}


if (!function_exists('getTime')) {
    function getTime($value): string
    {
        return preg_replace('/([0-9]{2}:[0-9]{2}):[0-9]{2}/', '$1', $value);
    }
}

if (!function_exists('site')) {
    function site($path = null, $parameters = [], $secure = null)
    {
        $url = url($path, $parameters, $secure);
        $url = preg_replace('/(.+?:\/\/)(.+?\.)(.*)/', '$1$3', $url);

        return $url;
    }
}

if (!function_exists('getIdYoutube')) {
    function getIdYoutube($url)
    {
        return preg_replace('/.*(\/|\?v=)(.{11})([&|\/].*|)/', '$2', $url);
    }
}

if (!function_exists('filterExists')) {
    function filterExists($array, $key)
    {
        return isset($array[$key]) && !empty($array[$key]);
    }
}

if (!function_exists('filterIsNumeric')) {
    function filterIsNumeric($array, $key)
    {
        return isset($array[$key]) && is_numeric($array[$key]);
    }
}

if (!function_exists('dateDescription')) {
    function dateDescription($date)
    {
        $datetime1 = new DateTime($date);
        $datetime2 = new DateTime('now');
        $interval = $datetime1->diff($datetime2);
        $days = $interval->days;
        $month = $interval->m;
        $year = $interval->y;
        $hours = $interval->h;
        $minutes = $interval->i;
        $h = ($hours > 1) ? ' horas' : ' hora';
        $d = ($days > 1) ? ' dias' : ' dia';
        $m = ($minutes > 1) ? ' minutos' : ' minuto';

        if ($minutes <= 10 && $days == 0 && $hours == 0) {
            return 'Agora';
        } elseif ($minutes > 10 && $days == 0 && $hours == 0) {
            return 'Há ' . $minutes . $m;
        } elseif ($days == 0) {
            return 'Há ' . $hours . $h;
        } elseif ($month == 0) {
            return 'Há ' . $days . $d;
        } elseif ($month > 0 && $year == 0) {
            return $datetime1->format('d') . '/' . $datetime1->format('m');
        } elseif ($year > 0) {
            return $datetime1->format('d') . '/' . $datetime1->format('m') . '/' . $datetime1->format('Y');
        }
    }
}

if (!function_exists('currency')) {
    function currency($value)
    {
        return config('app.company.currency_symbol') . ' ' . currencyFloat2Brl($value);
    }
}

if (!function_exists('onlyNumber')) {
    function onlyNumber($value)
    {
        return preg_replace('/\D/', '', $value);
    }
}

if (!function_exists('getBrandByCard')) {
    function getBrandByCard($cardNumber)
    {
        $prefixes = [
            'Visa' => 4,
            'Master' => [51, 52, 53, 54, 55],
            'Diners' => [301, 305, 36, 38],
            'Elo' => [
                636368, 438935, 504175, 451416, 509048, 509067, 509049, 509069, 509050, 509074, 509068, 509040,
                509045, 509051, 509046, 509066, 509047, 509042, 509052, 509043, 509064, 509040, 36297, 5067, 4576, 4011
            ],
            'Amex' => [34, 37],
            'Discover' => [6011, 622, 64, 65],
            'Aura' => 50,
            'JCB' => 35,
            'Hipercard' => [38, 60]
        ];

        foreach ($prefixes as $brand => $prefix) {
            if (!is_array($prefix)) {
                $prefix = [$prefix];
            }

            foreach ($prefix as $number) {
                preg_match('/^' . $number . '/', $cardNumber, $matches);

                if (!empty($matches)) {
                    return $brand;
                }
            }
        }

        return null;
    }
}

if (!function_exists('quotationToEntities')) {
    function quotationToHtmlEntities($text)
    {
        return str_replace('\'', '&apos;', $text);
    }
}

if (!function_exists('getFirstLetter')) {
    function getFirstLetter($name)
    {
        return substr($name, 0, 1);
    }
}

if (!function_exists('realStoragePath')) {
    function realStoragePath($url)
    {
        return preg_replace('/^.*\/storage\/(.*)$/', '$1', $url);
    }
}

if (!function_exists('basicResponse')) {
    function basicResponse($message, $code = 200)
    {
        return response()->json(['message' => $message], $code);
    }
}
