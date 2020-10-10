<?php

if (!function_exists('getOnlyNumber')) {
    function getOnlyNumber($value)
    {
        return preg_replace('/\D/', '', $value);
    }
}

if (!function_exists('onlyNumber')) {
    function onlyNumber($value)
    {
        return preg_replace('/\D/', '', $value);
    }
}

if (!function_exists('quotationToEntities')) {
    function quotationToHtmlEntities($text)
    {
        return str_replace('\'', '&apos;', $text);
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
