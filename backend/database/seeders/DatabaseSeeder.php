<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([SubjectSeeder::class]);
        $this->call([LanguageTypeSeeder::class]);
        $this->call([CsvImportSeeder::class]);
    }
}
