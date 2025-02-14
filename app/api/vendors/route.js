import { NextResponse } from "next/server"
import { auth } from "@/auth"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import Vendor from "@/models/Vendor"

const ITEMS_PER_PAGE = 10

export async function GET(request) {
  const session = await auth()
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    await dbConnect()
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * ITEMS_PER_PAGE

    const [vendors, totalCount] = await Promise.all([
      Vendor.find({ userId: user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(ITEMS_PER_PAGE),
      Vendor.countDocuments({ userId: user._id })
    ])

    return NextResponse.json({
      vendors,
      totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
      currentPage: page
    })
  } catch (error) {
    console.error("Error fetching vendors:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(request) {
  const session = await auth()
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    await dbConnect()

    let user = await User.findOne({ email: session.user.email })
    if (!user) {
      user = await User.create({
        email: session.user.email,
        name: session.user.name,
      })
    }

    const data = await request.json()

    const vendor = await Vendor.create({
      ...data,
      userId: user._id,
    })

    return NextResponse.json(vendor)
  } catch (error) {
    console.error("Error creating vendor:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}