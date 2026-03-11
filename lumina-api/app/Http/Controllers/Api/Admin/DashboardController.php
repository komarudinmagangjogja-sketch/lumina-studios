<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Portfolio;
use App\Models\Pricing;
use App\Models\Testimonial;
use App\Models\Faq;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            "total_services" => Service::count(),
            "total_portfolios" => Portfolio::count(),
            "total_pricings" => Pricing::count(),
            "total_testimonials" => Testimonial::count(),
            "total_faqs" => Faq::count(),
        ]);
    }
}