// src/app/api/engage/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('engage_builder');

    const classGrowthRates = await db
      .collection('unit base stats')
      .find({})
      .toArray();

    return NextResponse.json(classGrowthRates);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to fetch data' }, { status: 500 });
  }
}
