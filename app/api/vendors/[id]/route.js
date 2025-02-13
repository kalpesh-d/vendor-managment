import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function GET(request, { params }) {
  const session = await auth()
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const vendor = await prisma.vendor.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
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

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const data = await request.json()
    const vendor = await prisma.vendor.update({
      where: {
        id: params.id,
        userId: user.id,
      },
      data,
    })

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

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    await prisma.vendor.delete({
      where: {
        id: params.id,
        userId: user.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting vendor:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}