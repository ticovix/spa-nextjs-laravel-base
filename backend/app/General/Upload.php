<?php

namespace App\General;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Verot\Upload\Upload as VerotUpload;

class Upload extends VerotUpload
{
    public function __construct($file, $lang = 'en_GB')
    {
        parent::__construct($file, $lang);
    }

    public function save($path)
    {
        ini_set('max_execution_time', 300);

        $file = $this->process();

        $uniqueName = $this->uniqueName($path, $this->file_dst_name_ext);

        Storage::disk()->put($path . '/' . $uniqueName, $file, 'public');

        return Storage::url($path . '/' . $uniqueName);
    }

    private function uniqueName($path, $format)
    {
        $name = Str::random() . '.' . $format;
        $exists = Storage::disk()->exists($path . '/' . $name);
        if ($exists) {
            return $this->uniqueName($path, $format);
        }

        return $name;
    }
}
