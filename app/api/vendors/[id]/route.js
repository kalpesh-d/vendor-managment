import { NextResponse } from "next/server"
import { auth } from "@/auth"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import Vendor from "@/models/Vendor"
import { Types } from "mongoose"

function isValidObjectId(id) {
  return Types.ObjectId.isValid(id);
}

export async function GET(request, { params }) {
  const session = await auth()
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { id } = await params;

  try {
    if (!isValidObjectId(id)) {
      return new NextResponse("Invalid vendor ID", { status: 400 })
    }

    await dbConnect()
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const vendor = await Vendor.findOne({
      _id: Types.ObjectId.createFromHexString(id),
      userId: user._id,
    })

    if (!vendor) {
      return new NextResponse("Not Found", { status: 404 })
    }

    return NextResponse.json(vendor)
  } catch (error) {
    console.error("Error fetching vendor:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function PUT(request, { params }) {
  const session = await auth()
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { id } = await params;

  try {
    if (!isValidObjectId(id)) {
      return new NextResponse("Invalid vendor ID", { status: 400 })
    }

    await dbConnect()
    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const data = await request.json()
    const vendor = await Vendor.findOneAndUpdate(
      { _id: Types.ObjectId.createFromHexString(id), userId: user._id },
      { $set: data },
      { new: true }
    )

    if (!vendor) {
      return new NextResponse("Vendor not found", { status: 404 })
    }

    return NextResponse.json(vendor)
  } catch (error) {
    console.error("Error updating vendor:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const session = await auth()
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { id } = await params;

  try {
    if (!isValidObjectId(id)) {
      return new NextResponse("Invalid vendor ID", { status: 400 })
    }

    await dbConnect()
    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const vendor = await Vendor.findOneAndDelete({
      _id: Types.ObjectId.createFromHexString(id),
      userId: user._id,
    })

    if (!vendor) {
      return new NextResponse("Vendor not found", { status: 404 })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting vendor:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}