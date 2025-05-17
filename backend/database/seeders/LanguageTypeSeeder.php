<?php

namespace Database\Seeders;

use App\Models\LanguageType;
use Illuminate\Database\Seeder;

class LanguageTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = [
            ["code" => "N1", 'name' => 'English'],
            ["code" => "N2", 'name' => 'Russian'],
            ["code" => "N3", 'name' => 'French'],
            ["code" => "N4", 'name' => 'Chinese'],
            ["code" => "N5", 'name' => 'German'],
            ["code" => "N6", 'name' => 'Japanese'],
            ["code" => "N7", 'name' => 'Korean'],
        ];

        foreach ($languages as $language) {
            LanguageType::create($language);
        }
    }
}
