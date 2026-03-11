<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function index()
    {
        return response()->json(Faq::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
        ]);

        $faq = Faq::create($data);

        return response()->json($faq);
    }

    public function show($id)
    {
        return Faq::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $faq = Faq::findOrFail($id);
        $faq->update($request->all());

        return response()->json($faq);
    }

    public function destroy($id)
    {
        Faq::destroy($id);

        return response()->json([
            'message' => 'FAQ deleted'
        ]);
    }
}