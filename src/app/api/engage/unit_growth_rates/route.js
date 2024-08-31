import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('engage_builder');

    const unitGrowthRates = await db
      .collection('unit growth rates')
      .find({})
      .toArray();

    return NextResponse.json(unitGrowthRates);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to fetch data' }, { status: 500 });
  }
}
