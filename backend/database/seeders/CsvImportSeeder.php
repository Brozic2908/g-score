<?php

namespace Database\Seeders;

use App\Models\LanguageType;
use App\Models\Score;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class CsvImportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFile = database_path('seeders/data/diem_thi_thpt_2024.csv');
        $file = fopen($csvFile, 'r');

        // Skip header row to control fields
        fgetcsv($file);

        // Get all subjects and language types for reference
        $subjects = Subject::all()->keyBy('code')->toArray();
        $languageTypes = LanguageType::all()->keyBy('code')->toArray();

        while (($data = fgetcsv($file)) !== false) {
            // Create student
            $student = Student::create([
                'registration_number' => $data[0], // assuming sbd is the first co
            ]);

            // Process scores - Map CSV columns to subject codes
            $scoreMapping = [
                1 => 'toan',
                2 => 'ngu_van',
                3 => 'ngoai_ngu',
                4 => 'vat_li',
                5 => 'hoa_hoc',
                6 => 'sinh_hoc',
                7 => 'lich_su',
                8 => 'dia_li',
                9 => 'gdcd',
            ];

            foreach ($scoreMapping as $index => $subjectCode) {
                if (isset($data[$index]) && $data[$index] !== '') {
                    Score::create([
                        'student_id' => $student->id,
                        'subject_id' => $subjects[$subjectCode]['id'],
                        'score' => (float) $data[$index],
                    ]);
                }
            }

            // Process language type (last column)
            if (!isset($data[10]) && $data[10] !== '' && isset($languageTypes[$data[10]])) {
                Student::create([
                    'student_id' => $student->id,
                    'language_type_id' => $languageTypes[$data[10]]['id'],
                ]);
            }
        }

        fclose($file);
    }
}
