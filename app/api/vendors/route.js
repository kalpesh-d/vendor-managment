import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

const ITEMS_PER_PAGE = 10

export async function GET(request) {
  const session = await auth()
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1")
  const skip = (page - 1) * ITEMS_PER_PAGE

  try {
    const [vendors, totalCount] = await Promise.all([
      prisma.vendor.findMany({
        where: {
          userId: session.user.id,
        },
        skip,
        take: ITEMS_PER_PAGE,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.vendor.count({
        where: {
          userId: session.user.id,
        },
      }),
    ])

    return NextResponse.json({
      vendors,
      totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
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
    const data = await request.json()

    // First ensure the user exists in the database
    const user = await prisma.user.upsert({
      where: { email: session.user.email },
      update: {},
      create: {
        email: session.user.email,
        name: session.user.name,
      },
    })

    // Create the vendor with the user association
    const vendor = await prisma.vendor.create({
      data: {
        ...data,
        userId: user.id,
      },
    })

    return NextResponse.json(vendor)
  } catch (error) {
    console.error("Error creating vendor:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}