<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;


class PortfolioController extends Controller
{
    public function index()
    {
        return response()->json(Portfolio::all());
    }

public function store(Request $request)
{
    $data = $request->validate([
        'title' => 'required',
        'category' => 'required',
        'image' => 'required|image',
    ]);

    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('portfolios', 'public');
    }

    return Portfolio::create($data);
}
    public function show(Portfolio $portfolio)
    {
        return response()->json($portfolio);
    }

public function update(Request $request, Portfolio $portfolio)
{
    $data = $request->validate([
        'title' => 'required',
        'category' => 'required',
        'description' => 'nullable',
        'image' => 'nullable|image',
    ]);

    // 🔥 kalau ada image baru
    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('portfolios', 'public');
    } else {
        // 🔥 penting: pakai image lama
        $data['image'] = $portfolio->image;
    }

    $portfolio->update($data);

    return response()->json($portfolio);
}

    public function destroy(Portfolio $portfolio)
    {
        $portfolio->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
