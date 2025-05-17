<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentLanguage extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'language_type_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function languageType()
    {
        return $this->belongsTo(LanguageType::class);
    }
}
