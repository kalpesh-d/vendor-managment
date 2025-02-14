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

    const vendors = await Vendor.find({ userId: user._id })
    return NextResponse.json(vendors)
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

    // First ensure the user exists in the database
    let user = await User.findOne({ email: session.user.email })
    if (!user) {
      user = await User.create({
        email: session.user.email,
        name: session.user.name,
      })
    }

    const data = await request.json()

    // Create the vendor with the user association
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