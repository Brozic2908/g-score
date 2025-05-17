<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = [
            ['code' => 'toan', 'name' => 'Mathematics'],
            ['code' => 'ngu_van', 'name' => 'Literature'],
            ['code' => 'ngoai_ngu', 'name' => 'Foreign Language'],
            ['code' => 'vat_li', 'name' => 'Physics'],
            ['code' => 'hoa_hoc', 'name' => 'Chemistry'],
            ['code' => 'sinh_hoc', 'name' => 'Biology'],
            ['code' => 'lich_su', 'name' => 'History'],
            ['code' => 'dia_li', 'name' => 'Geography'],
            ['code' => 'gdcd', 'name' => 'Civic Education']
        ];

        foreach ($subjects as $subject) {
            Subject::create($subject);
        }
    }
}
