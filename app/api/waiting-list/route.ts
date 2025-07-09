/**
 * Waiting List API Route
 * Next.js API route for handling waiting list submissions
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { WaitingListFormData, WaitingListResponse } from '@/Interface/WaitingList';

/**
 * POST /api/waiting-list
 * Handle waiting list form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: WaitingListFormData = await request.json();

    // Validate required fields
    if (!body.email) {
      return NextResponse.json<WaitingListResponse>({
        success: false,
        message: 'Email is required',
        error: 'MISSING_EMAIL'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<WaitingListResponse>({
        success: false,
        message: 'Please enter a valid email address.',
        error: 'INVALID_EMAIL'
      }, { status: 400 });
    }

    // Create server-side Supabase client
    const supabase = await createClient();

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('waiting_list')
      .select('email')
      .eq('email', body.email.toLowerCase().trim())
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Database check error:', checkError);
      return NextResponse.json<WaitingListResponse>({
        success: false,
        message: 'Database error occurred',
        error: 'DATABASE_ERROR'
      }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json<WaitingListResponse>({
        success: false,
        message: 'This email is already registered in our waiting list.',
        error: 'DUPLICATE_EMAIL'
      }, { status: 409 });
    }

    // Prepare data for insertion
    const insertData = {
      email: body.email.toLowerCase().trim(),
      name: body.name?.trim() || null,
      interest: body.interest || null,
      location: body.location?.trim() || null,
      newsletter: body.newsletter
    };

    // Insert new entry
    const { data, error } = await supabase
      .from('waiting_list')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Supabase insertion error:', error);
      return NextResponse.json<WaitingListResponse>({
        success: false,
        message: 'Failed to add to waiting list',
        error: 'INSERTION_ERROR'
      }, { status: 500 });
    }

    // Success response
    return NextResponse.json<WaitingListResponse>({
      success: true,
      message: 'Successfully added to waiting list!',
      data: data
    }, { status: 201 });

  } catch (error) {
    console.error('API Route error:', error);
    return NextResponse.json<WaitingListResponse>({
      success: false,
      message: 'Internal server error',
      error: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

/**
 * GET /api/waiting-list/stats
 * Get waiting list statistics (optional)
 */
export async function GET() {
  try {
    const supabase = await createClient();
    
    const { count, error } = await supabase
      .from('waiting_list')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Stats error:', error);
      return NextResponse.json({
        success: false,
        message: 'Failed to get statistics',
        error: 'STATS_ERROR'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: { count: count || 0 }
    });

  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}