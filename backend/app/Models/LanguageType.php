<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LanguageType extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'name'];

    public function studentLanguages()
    {
        return $this->hasMany(StudentLanguage::class);
    }
}
