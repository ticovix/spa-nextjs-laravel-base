<?php

namespace App\Enums;

final class ServiceStatus extends Enum
{
    const OPEN = 0;
    const IN_PROGRESS = 1;
    const COMPLETED = 2;
    const CANCELED = 3;
    const BILLED = 4;
}
