<?php

use App\Enums;

return [

    Enums\UserStatus::class => [
        Enums\UserStatus::INACTIVE => 'Inativo',
        Enums\UserStatus::ACTIVE => 'Ativo'
    ],

    Enums\AddressStatus::class => [
        Enums\AddressStatus::INACTIVE => 'Inativo',
        Enums\AddressStatus::ACTIVE => 'Ativo'
    ],

    Enums\AddressMain::class => [
        Enums\AddressMain::NOT => 'Não',
        Enums\AddressMain::YES => 'Sim'
    ],

    Enums\AddressLocal::class => [
        Enums\AddressLocal::NOT => 'Não',
        Enums\AddressMain::YES => 'Sim'
    ],

    Enums\ServiceStatus::class => [
        Enums\ServiceStatus::OPEN => 'Aberto',
        Enums\ServiceStatus::IN_PROGRESS => 'Em Andamento',
        Enums\ServiceStatus::COMPLETED => 'Concluido',
        Enums\ServiceStatus::CANCELED => 'Cancelado',
        Enums\ServiceStatus::BILLED => 'Faturado',
    ],

    Enums\ContractorType::class => [
        Enums\ContractorType::PRIVATE => 'Particular',
        Enums\ContractorType::INSURANCE_COMPANY => 'Seguradora'
    ],
];
