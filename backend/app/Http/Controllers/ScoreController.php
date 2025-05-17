<?php

namespace App\Http\Controllers;

use App\Models\Score;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ScoreController extends Controller
{
    public function search(Request $request)
    {
        $request->validate([
            'registration_number' => "required|string",
        ]);

        $student = Student::where('registration_number', $request->registration_number)
            ->with(['scores.subject', 'language.languageType'])
            ->first();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Student not found',
            ], 404);
        }

        // Format scores for display
        $formattedScores = [];
        foreach ($student->scores as $score) {
            $formattedScores[$score->subject->name] = $score->score;
        }

        return response()->json([
            'success' => true,
            'student' => [
                'registration_number' => $student->registration_number,
                'scores' => $formattedScores,
                'language' => $student->language,
            ]
        ]);
    }

    public function dashboard()
    {
        $subjects = Subject::all();

        $reportData = [];
        foreach ($subjects as $subject) {
            $reportData[$subject->name] = [
                'excellent' => Score::where('subject_id', $subject->id)->where('score', '>=', 8)->count(),
                'good' => Score::where('subject_id', $subject->id)->whereBetween('score', [6, 7.99])->count(),
                'average' => Score::where('subject_id', $subject->id)->whereBetween('score', [4, 5.99])->count(),
                'below_average' => Score::where('subject_id', $subject->id)->where('score', '<', 4)->count(),
            ];
        }

        $studentCount =  Student::count();

        return response()->json([
            'studentCount' => $studentCount,
            'data' => $reportData
        ]);
    }

    public function  topStudents()
    {
        // Get top 10 students in group A (Math, Physics, Chemistry)
        $mathId = Subject::where('code', 'toan')->first()->id;
        $physicsId = Subject::where('code', 'vat_li')->first()->id;
        $chemistryId = Subject::where('code', 'hoa_hoc')->first()->id;

        $topStudent = Student::select('students.id', 'students.registration_number')
            ->join('scores as math_scores', function ($join) use ($mathId) {
                $join->on('students.id', '=', 'math_scores.student_id')
                    ->where('math_scores.subject_id', '=', $mathId);
            })
            ->join('scores as physics_scores', function ($join) use ($physicsId) {
                $join->on('students.id', '=', 'physics_scores.student_id')
                    ->where('physics_scores.subject_id', '=', $physicsId);
            })
            ->join('scores as chemistry_scores', function ($join) use ($chemistryId) {
                $join->on('students.id', '=', 'chemistry_scores.student_id')
                    ->where('chemistry_scores.subject_id', '=', $chemistryId);
            })
            ->select(
                'students.registration_number',
                'math_scores.score as math_score',
                'physics_scores.score as physics_score',
                'chemistry_scores.score as chemistry_score',
                DB::raw('(math_scores.score + physics_scores.score + chemistry_scores.score) as total_score')
            )
            ->orderBy('total_score', 'desc')
            ->limit(10)
            ->get();

        return response()->json($topStudent);
    }
}
