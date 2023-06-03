<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSkillRequest;
use App\Http\Resources\V1\SkillCollection;
use App\Http\Resources\V1\SkillResource;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index() /* index show nya lahat ng data sa database. GET */
    {
        return new SkillCollection(Skill::all());
    }

    public function show(Skill $skill){  /* show means ididisplay nya yong data by id. GET */
        return new SkillResource($skill); /* Skill Resource means kung may gusto kalang na i display or tatanggalin sa page. To create naman is php artisan make:resource V1/SkillResource */
    }

    public function store(StoreSkillRequest $request) /* create or input. POST */
    {
        Skill::create($request->validated());
        return response()->json("Skill Created");
    }

    public function update(StoreSkillRequest $request, Skill $skill)
    {
        $skill->update($request->validated());
        return response()->json("Skill Updated");
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return response()->json("Skill Deleted");
    }

   
}
