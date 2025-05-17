<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'name'];

    public function scores()
    {
        return $this->hasMany(Score::class);
    }

    // Helper method to get score level distribution for this subject
    public function getScoreLevelDistribution()
    {
        return [
            'excellent' => $this->scores()->where('score', '>=', 8)->count(),
            'good' => $this->scores()->whereBetween('score', [6, 8])->count(),
            'average' => $this->scores()->whereBetween('score', [7, 8])->count(),
            'below_average' => $this->scores()->where('score', '<', 4)->count(),
        ];
    }
}
