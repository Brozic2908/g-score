<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = ['registration_number'];

    // A Student has many score and Language
    public function scores()
    {
        return $this->hasMany(Score::class);
    }

    // A Student can know many languages
    public function language()
    {
        return $this->hasMany(StudentLanguage::class);
    }
}
