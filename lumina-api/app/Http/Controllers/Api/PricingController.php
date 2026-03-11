<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pricing;
use Illuminate\Http\Request;

class PricingController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | GET ALL PRICINGS
    |--------------------------------------------------------------------------
    */
    public function index()
    {
        $pricings = Pricing::where('is_active', true)
            ->orderBy('price', 'asc')
            ->get();

        return response()->json($pricings);
    }

    /*
    |--------------------------------------------------------------------------
    | STORE NEW PRICING
    |--------------------------------------------------------------------------
    */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'features' => 'required|array',
            'features.*' => 'string',
            'is_active' => 'boolean'
        ]);

        $pricing = Pricing::create([
            'title' => $validated['title'],
            'price' => $validated['price'],
            'features' => json_encode($validated['features']), // 🔥 penting
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return response()->json([
            'message' => 'Pricing created successfully',
            'data' => $pricing
        ], 201);
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW SINGLE PRICING
    |--------------------------------------------------------------------------
    */
    public function show($id)
    {
        $pricing = Pricing::findOrFail($id);

        return response()->json($pricing);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE PRICING
    |--------------------------------------------------------------------------
    */
    public function update(Request $request, $id)
    {
        $pricing = Pricing::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'features' => 'required|array',
            'features.*' => 'string',
            'is_active' => 'boolean'
        ]);

        $pricing->update([
            'title' => $validated['title'],
            'price' => $validated['price'],
            'features' => json_encode($validated['features']),
            'is_active' => $validated['is_active'] ?? $pricing->is_active,
        ]);

        return response()->json([
            'message' => 'Pricing updated successfully',
            'data' => $pricing
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE PRICING
    |--------------------------------------------------------------------------
    */
    public function destroy($id)
    {
        $pricing = Pricing::findOrFail($id);
        $pricing->delete();

        return response()->json([
            'message' => 'Pricing deleted successfully'
        ]);
    }
}