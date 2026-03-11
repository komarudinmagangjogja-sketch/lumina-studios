<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function index()
    {
        return response()->json(Testimonial::latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'role' => 'nullable|string',
            'message' => 'required|string',
            'rating' => 'nullable|integer',
            'photo' => 'nullable|image|max:2048',
        ]);

        // upload photo
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('testimonials', 'public');
            $data['photo'] = $path;
        }

        $testimonial = Testimonial::create($data);

        return response()->json($testimonial);
    }

    public function show($id)
    {
        return Testimonial::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string',
            'role' => 'nullable|string',
            'message' => 'required|string',
            'rating' => 'nullable|integer',
            'photo' => 'nullable|image|max:2048',
        ]);

        // jika upload photo baru
        if ($request->hasFile('photo')) {

            // hapus photo lama
            if ($testimonial->photo) {
                Storage::disk('public')->delete($testimonial->photo);
            }

            $path = $request->file('photo')->store('testimonials', 'public');
            $data['photo'] = $path;
        }

        $testimonial->update($data);

        return response()->json($testimonial);
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);

        // hapus photo
        if ($testimonial->photo) {
            Storage::disk('public')->delete($testimonial->photo);
        }

        $testimonial->delete();

        return response()->json(['message' => 'Deleted']);
    }
}